const mongoose = require('mongoose');

const { Pending, Succeeded, Failed, PaymentStatusList } = require('../../utils/variables/payment');
const { PaymentOperationTypeList } = require('../../utils/variables/paymentoperation');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/* This is used by the MangoPay PayIn/PayOut/Transfer webhooks */
const mongoSchema = new Schema({
  payment: {
    type: ObjectId,
    ref: 'Payment',
    required: true,
  },
  operationType: {
    type: String,
    enum: PaymentOperationTypeList,
    required: true,
  },
  operationStatus: {
    type: String,
    enum: PaymentStatusList,
    required: true,
  },
  operationId: {
    type: String,
    required: true,
    unique: true,
  },
});

mongoSchema.index({ payment: 1, operationType: 1 }, { unique: true });

class PaymentOperationClass {
  static async add({ payment, operationType, operationId }) {
    const paymentOperation = await this.create({
      payment,
      operationType,
      operationId,
      operationStatus: Pending,
    });
    return { paymentOperation };
  }

  static async succeedById({ operationId }) {
    const paymentOperation = await this.findOne({ operationId }).populate('payment');
    if (!paymentOperation) {
      throw new Error('Payment Operation not found');
    }
    if (paymentOperation.operationStatus !== Pending) {
      throw new Error('Payment Operation already processed');
    }
    paymentOperation.operationStatus = Succeeded;
    await paymentOperation.save();
    return { paymentOperation };
  }
}
mongoSchema.loadClass(PaymentOperationClass);

const PaymentOperation = mongoose.model('PaymentOperation', mongoSchema);

module.exports = PaymentOperation;
