const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  // Is it for a user subscription or for an offer?
  reason: {
    type: String,
    // enum: PaymentReasonList,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    // enum: PaymentStatuses,
    required: true,
  },
  offer: {
    type: ObjectId,
    ref: 'CampaignOffer',
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

class PaymentClass {}
mongoSchema.loadClass(PaymentClass);

const Payment = mongoose.model('Payment', mongoSchema);

module.exports = Payment;
