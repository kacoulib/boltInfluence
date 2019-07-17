const mongoose = require('mongoose');

const {
  Proposed,
  AwaitingFunding,
  Ongoing,
  AwaitingValidation,
  Disputed,
  Validated,
  CampaignOfferStatusList,
  isProposed,
} = require('../../utils/variables/campaignoffer');
const generateSlug = require('../utils/slugify');
const { createWallet } = require('../utils/mangopay');

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
  // /**
  //  * List a limited amount of Campaigns
  //  * @param {ObjectId} campaign - ID of the Campaign to which the offers are
  //  * @param {Object} options
  //  * @param {Number} options.offset - Amount of Campaigns to skip
  //  * @param {Number} options.limit - Amount of Campaigns to return
  //  */
  // static async listForCampaign(campaign, { offset = 0, limit = 10 } = {}) {
  //   const offers = await this.find({ campaign })
  //     .sort({ createdAt: -1 })
  //     .skip(offset)
  //     .limit(limit);
  //   return { offers };
  // }
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
    const offer = await this.findOne({ slug });
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
    await offer.save();
    return { offer };
  }

  static async changeStatusBySlug({ slug, status }) {
    const { offer } = await this.getBySlug({ slug });
    const transitions = {
      [Proposed]: {
        [AwaitingFunding]: this.acceptProposal.bind(this),
      },
      [AwaitingFunding]: {
        [Ongoing]: null,
      },
      [Ongoing]: {
        [AwaitingValidation]: null,
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
}
mongoSchema.loadClass(CampaignOfferClass);

const CampaignOffer = mongoose.model('CampaignOffer', mongoSchema);

module.exports = CampaignOffer;
