const mongoose = require('mongoose');

const Payment = require('./Payment');
const PaymentOperation = require('./PaymentOperation');
const User = require('./User');
const {
  Proposed,
  AwaitingFunding,
  Ongoing,
  AwaitingValidation,
  Disputed,
  Validated,
  CampaignOfferStatusList,
  isProposed,
  isAwaitingFunding,
  isOngoing,
  isAwaitingValidation,
} = require('../../utils/variables/campaignoffer');
const generateSlug = require('../utils/slugify');
const {
  createWallet,
  getWallet,
  createCardDirectPayIn,
  createTransfer,
} = require('../utils/mangopay');
const logger = require('../logs');
const { Failed } = require('../../utils/variables/payment');
const { PayIn, TransferOut } = require('../../utils/variables/paymentoperation');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  campaign: {
    type: ObjectId,
    ref: 'Campaign',
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: CampaignOfferStatusList,
    required: true,
  },
  mangopay: {
    wallet: String,
  },
});

class CampaignOfferClass {
  /**
   * List a limited amount of Campaign Offers
   * @param {Object} where - Filter criterias
   * @param {Object} options
   * @param {Number} options.offset - Amount of Campaigns to skip
   * @param {Number} options.limit - Amount of Campaigns to return
   */
  static async list(where, { offset = 0, limit = 10 } = {}) {
    const offers = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return { offers };
  }

  /**
   * Create a new offer by a user for a campaign
   * @param {Object} options
   * @param {Object} options.campaign - Campaign object
   * @param {ObjectId} options.campaign._id - Campaign ID
   * @param {String} options.campaign.slug - Campaign slug
   * @param {Object} options.user - User object
   * @param {ObjectId} options.user._id - User ID
   * @param {String} options.user.slug - User slug
   */
  static async add({ campaign, user }) {
    const slug = await generateSlug(this, `${campaign.slug}-${user.slug}`);
    const offer = await this.create({
      slug,
      campaign: campaign._id,
      user: user._id,
      status: Proposed,
    });
    return { offer };
  }

  static async getBySlug({ slug }) {
    const offer = await this.findOne({ slug })
      .populate('campaign')
      .populate('user', User.publicFields());
    if (!offer) {
      throw new Error('Offer not found');
    }
    return { offer };
  }

  static async acceptProposal({ offer }) {
    const off = offer;
    if (!isProposed(off)) {
      throw new Error('Offer is not a proposal.');
    }

    const { wallet } = await createWallet({
      owner: process.env.MANGOPAY_BOLT_USERID,
      description: `Campaign Offer ${off.slug}`,
    });

    off.status = AwaitingFunding;
    off.mangopay.wallet = wallet.Id;
    await off.save();
    return { offer: off };
  }

  static async validateFunds({ offer }) {
    const off = offer;

    if (!isAwaitingFunding(off)) {
      throw new Error('Campaign Offer is not waiting for funds');
    }
    if (!off.campaign) {
      throw new Error('Campaign Offer has no associated Campaign');
    }
    if (!off.mangopay.wallet) {
      throw new Error('Campaign Offer cannot have funds');
    }

    const { wallet } = await getWallet({ wallet: off.mangopay.wallet });

    if (wallet.Balance.Amount < off.campaign.budget) {
      throw new Error('Campaign Offer does not have enough funds');
    }

    off.status = Ongoing;
    await off.save();
    return { offer: off };
  }

  static async finishWork({ offer }) {
    const off = offer;

    if (!isOngoing(off)) {
      throw new Error('Campaign Offer is not ongoing');
    }

    off.status = AwaitingValidation;
    await off.save();
    return { offer: off };
  }

  static async validate({ offer }) {
    const off = offer;

    if (!isAwaitingValidation(off)) {
      throw new Error('Campaign Offer is not awaiting validation');
    }

    off.status = Validated;
    await off.save();
    return { offer: off };
  }

  static async changeStatusBySlug({ slug, status }) {
    const { offer } = await this.getBySlug({ slug });
    const transitions = {
      [Proposed]: {
        [AwaitingFunding]: this.acceptProposal.bind(this),
      },
      [AwaitingFunding]: {
        [Ongoing]: this.validateFunds.bind(this),
      },
      [Ongoing]: {
        [AwaitingValidation]: this.finishWork.bind(this),
      },
      [AwaitingValidation]: {
        [Disputed]: null,
        [Validated]: null,
      },
      // [Disputed]: {},
      // [Validated]: {},
    };
    const fn = (transitions[offer.status] || {})[status];
    if (!fn) {
      throw new Error(`CampaignOffer cannot transition to status from ${offer.status}`);
    }
    return fn({ offer, status });
  }

  /**
   *
   * @param {Object} options
   * @param {String} user - User slug, the one funding the offer
   * @param {String} card - Card ID used for the PayIn
   */
  static async fundWithCardBySlug({ user: userSlug, card, offer: offerSlug }) {
    const offer = await this.findOne({ slug: offerSlug }).populate('campaign');
    if (!offer) {
      throw new Error('CampaignOffer not found');
    }
    if (!isAwaitingFunding(offer)) {
      throw new Error('CampaignOffer is not waiting any funding.');
    }
    const user = await User.findOne({ slug: userSlug });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.mangopay.wallet) {
      throw new Error('User has no wallet');
    }
    const { payment } = await Payment.add({
      offer: offer._id,
      amount: offer.campaign.budget,
      debitedUser: user._id,
    });
    let payin;
    try {
      payin = (await createCardDirectPayIn({
        user: user.mangopay.id,
        card,
        amount: offer.campaign.budget,
        creditedWallet: user.mangopay.wallet,
      })).payin;
    } catch (err) {
      logger.error(err);
      payment.status = Failed;
      await payment.save();
      throw err;
    }

    const { paymentOperation } = await PaymentOperation.add({
      payment: payment._id,
      operationType: PayIn,
      operationId: payin.Id,
    });
    // logger.info(payment.toObject());
    // logger.info(payin);
    // logger.info(paymentOperation);
  }

  static async fundWithBankwireBySlug({ slug }) {
    // Create a MangoPay Bankwire PayIn to user's
    // wallet
    // Make it so there's a transfer to the offer's
    // wallet once the wire is processed
    // Make it so the offer transitions to the
    // Ongoing status once the transfer is processed
  }

  static async validateFundsById({ offerId }) {
    const offer = await this.findById(offerId).populate('campaign');
    if (!offer) {
      throw new Error('Campaign Offer not found');
    }
    return this.validateFunds({ offer });
  }

  static async finishWorkBySlug({ slug }) {
    const offer = await this.getBySlug({ slug });
    return this.finishWork({ offer });
  }

  static async freeFundsBySlug({ slug }) {
    const offer = await this.findOne({ slug }).populate('campaign');

    if (!offer) {
      throw new Error('Campaign Offer not found');
    }
    if (!isAwaitingValidation(offer)) {
      throw new Error('Campaign Offer is not awaiting validation');
    }
    if (!offer.campaign) {
      throw new Error('Campaign Offer has no associated campaign');
    }

    const user = await User.findById(offer.user);

    if (!user) {
      throw new Error('User not found');
    }
    if (!user.mangopay.wallet || !user.mangopay.bankAccount) {
      throw new Error('User cannot receive payment');
    }

    const { payment } = await Payment.add({
      offer: offer._id,
      amount: offer.campaign.budget,
      creditedUser: user._id,
    });

    let transferout;
    try {
      transferout = (await createTransfer({
        debitedUser: process.env.MANGOPAY_BOLT_USERID,
        debitedWallet: offer.mangopay.wallet,
        creditedWallet: user.mangopay.wallet,
        amount: offer.campaign.budget,
      })).transfer;
    } catch (err) {
      logger.error(err);
      payment.status = Failed;
      await payment.save();
      throw err;
    }

    const { paymentOperation } = await PaymentOperation.add({
      payment: payment._id,
      operationType: TransferOut,
      operationId: transferout.Id,
    });
  }

  static async validateById({ offerId }) {
    const offer = await this.findById(offerId).populate('campaign');
    if (!offer) {
      throw new Error('Campaign Offer not found');
    }
    return this.validate({ offer });
  }

  static async getFundsBySlug({ slug }) {
    const offer = await this.findOne({ slug }).select('mangopay.wallet');

    if (!offer) {
      throw new Error('Campaign Offer not found');
    }

    let funds = { amount: 0, currency: 'EUR' };

    if (offer.mangopay.wallet) {
      const { wallet } = await getWallet({ wallet: offer.mangopay.wallet });

      funds = { amount: wallet.Balance.Amount, currency: wallet.Balance.Currency };
    }
    return { funds };
  }
}

mongoSchema.loadClass(CampaignOfferClass);

const CampaignOffer = mongoose.model('CampaignOffer', mongoSchema);

module.exports = CampaignOffer;
