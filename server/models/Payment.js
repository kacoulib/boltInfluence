const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  // Whether the execution is handled by Bolt or not
  execution: {
    type: String,
    // enum: PaymentExecutionList,
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
    required: true,
  },
  from: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  mangopay: {
    id: String,
  },
});

class PaymentClass {}
mongoSchema.loadClass(PaymentClass);

const Payment = mongoose.model('Payment', mongoSchema);

module.exports = Payment;
