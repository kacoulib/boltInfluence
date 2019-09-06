const mongoose = require('mongoose');

const { getMangopay } = require('../utils/mangopay');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

mongoSchema.index({ user: 1, documentType: 1 }, { unique: true });

class KycValidationClass {
  static async addOrUpdate({ documentId, documentType, user, status }) {
    let kycValidation = await this.findOne({ user, documentType });
    if (!kycValidation) {
      kycValidation = await this.create({
        documentId,
        documentType,
        user,
        status,
      });
    } else {
      let save = false;
      if (kycValidation.documentId !== documentId) {
        kycValidation.documentId = documentId;
        save = true;
      }
      if (kycValidation.status !== status) {
        kycValidation.status = status;
        save = true;
      }
      if (save) {
        await kycValidation.save();
      }
    }

    return { kycValidation };
  }

  static async getByDocumentId({ documentId }) {
    const kycValidation = await this.findOne({ documentId });
    return { kycValidation };
  }

  static async updateStatusByDocumentId({ documentId, status }) {
    const { kycValidation } = await this.getByDocumentId({ documentId });

    if (!kycValidation) {
      throw new Error('KYC Document validation record not found.');
    }

    kycValidation.status = status;
    await kycValidation.save();
    return { kycValidation };
  }

  static async validateByDocumentId({ documentId }) {
    const mangopay = getMangopay();
    return this.updateStatusByDocumentId({
      documentId,
      status: mangopay.models.KycDocumentStatus.Validated,
    });
  }

  static async refuseByDocumentId({ documentId }) {
    const mangopay = getMangopay();
    return this.updateStatusByDocumentId({
      documentId,
      status: mangopay.models.KycDocumentStatus.Refused,
    });
  }
}
mongoSchema.loadClass(KycValidationClass);

const KycValidation = mongoose.model('KycValidation', mongoSchema);

module.exports = KycValidation;
