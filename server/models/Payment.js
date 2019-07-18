const mongoose = require('mongoose');

const PaymentOperation = require('./PaymentOperation');
const { isAwaitingFunding } = require('../../utils/variables/campaignoffer');
const {
  Pending,
  isPending,
  Bolt,
  Succeeded,
  Failed,
  PaymentExecutionList,
  PaymentStatusList,
} = require('../../utils/variables/payment');
const { TransferIn } = require('../../utils/variables/paymentoperation');
const { createTransfer } = require('../utils/mangopay');
const logger = require('../logs');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  // Whether the execution is handled by Bolt or not
  execution: {
    type: String,
    enum: PaymentExecutionList,
    default: Bolt,
  },
  status: {
    type: String,
    enum: PaymentStatusList,
    required: true,
  },
  offer: {
    type: ObjectId,
    ref: 'CampaignOffer',
    required: true,
  },
  debitedUser: {
    type: ObjectId,
    ref: 'User',
  },
  creditedUser: {
    type: ObjectId,
    ref: 'User',
  },
});

class PaymentClass {
  /**
   * Create a new payment
   * @param {Object} options
   * @param {ObjectId} options.offer
   * @param {Number} options.amount
   * @param {ObjectId} [options.creditedUser]
   * @param {ObjectId} [options.debitedUser]
   */
  static async add({ offer, amount, creditedUser, debitedUser }) {
    if (!creditedUser && !debitedUser) {
      throw new Error('Payment has to have a credited or a debited user');
    }
    if (creditedUser && debitedUser) {
      throw new Error('Payment cannot be both a credit and a debit');
      // TODO: Only escrow is supported, every payment comes either
      // from or to the escrow wallet
    }
    const payment = await this.create({
      offer,
      amount,
      creditedUser,
      debitedUser,
      status: Pending,
    });
    return { payment };
  }

  static async transferInById({ paymentId }) {
    const payment = await this.findById(paymentId)
      .populate('offer')
      .populate('debitedUser');

    if (!payment) {
      throw new Error('Payment not found');
    }
    if (!isPending(payment)) {
      throw new Error('Payment already processed');
    }
    if (!payment.offer) {
      throw new Error('Payment does not have an associated Campaign Offer');
    }
    if (!isAwaitingFunding(payment.offer) || !payment.offer.mangopay.wallet) {
      throw new Error('Campaign Offer cannot be credited');
    }
    if (!payment.debitedUser) {
      throw new Error('Payment cannot debit');
    }
    if (!payment.debitedUser.mangopay.id || !payment.debitedUser.mangopay.wallet) {
      throw new Error('User cannot be debited');
    }

    let transfer;

    try {
      transfer = (await createTransfer({
        debitedUser: payment.debitedUser.mangopay.id,
        debitedWallet: payment.debitedUser.mangopay.wallet,
        creditedWallet: payment.offer.mangopay.wallet,
        amount: payment.amount,
      })).transfer;
    } catch (err) {
      logger.error(err);
      payment.status = Failed;
      await payment.save();
      throw err;
    }

    const { paymentOperation } = await PaymentOperation.add({
      payment: payment._id,
      operationType: TransferIn,
      operationId: transfer.Id,
    });
    // logger.info(payment);
    // logger.info(transfer);
    // logger.info(paymentOperation);
  }

  static async succeedById({ paymentId }) {
    const payment = await this.findById(paymentId);

    if (!payment) {
      throw new Error('Payment not found');
    }
    if (!isPending(payment)) {
      throw new Error('Payment already processed');
    }
    payment.status = Succeeded;
    await payment.save();
  }
}
mongoSchema.loadClass(PaymentClass);

const Payment = mongoose.model('Payment', mongoSchema);

module.exports = Payment;

/* Payments will mainly be controlled by webhooks                                     */
/* A payment is created with a payin that needs to succeed                            */
/* Once the payin succeeds, a transfer to the escrow wallet will proceed              */
/* Once the transfer succeeds, the offer changes to Ongoing                           */
/* Once the offer is complete, a transfer will proceed to the influencer's wallet     */
/* Once the transfer succeeds, a payout will proceed to the influencer's bank account */
