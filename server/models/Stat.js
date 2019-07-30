const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  offer: {
    type: ObjectId,
    ref: 'CampaignOffer',
  },
  offerStatus: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  media: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    min: 0,
    required: true,
  },
});

class StatClass {
  static async addOrUpdateForOfferById({ offerId: offer, offerStatus, media, value }) {
    const stat = await this.updateOne(
      { offer, offerStatus, media },
      { offer, offerStatus, media, value },
      { upsert: true },
    );
    return { stat };
  }

  static async addOrUpdateForUserById({ userId: user, media, value }) {
    const stat = await this.updateOne({ user, media }, { user, media, value }, { upsert: true });
    return { stat };
  }

  static async getAllForOfferById({ offerId, offerStatus }) {
    const stats = await this.find({ offer: offerId, offerStatus });
    return { stats };
  }

  static async getAllForUserById({ userId }) {
    const stats = await this.find({ user: userId });
    return { stats };
  }

  static async addOrUpdateManyForOfferById(stats) {
    const ops = stats.map((s) => ({
      updateOne: {
        update: {
          $set: {
            offer: s.offerId,
            offerStatus: s.offerStatus,
            media: s.media,
            value: s.value,
          },
        },
        upsert: true,
        filter: { offer: s.offerId, offerStatus: s.offerStatus, media: s.media },
      },
    }));
    const results = await this.bulkWrite(ops, { ordered: false });
    // TODO: Should handle results
  }

  static async addOrUpdateManyForUserById(stats) {
    const ops = stats.map((s) => ({
      updateOne: {
        update: {
          $set: {
            user: s.user,
            media: s.media,
            value: s.value,
          },
        },
        upsert: true,
        filter: { user: s.user, media: s.media },
      },
    }));
    const results = await this.bulkWrite(ops, { ordered: false });
    // TODO: Should handle results
  }
}
mongoSchema.loadClass(StatClass);

const Stat = mongoose.model('Stat', mongoSchema);

module.exports = Stat;
