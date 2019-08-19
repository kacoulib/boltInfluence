const mongoose = require('mongoose');

const { CommissionPlaceList } = require('../../utils/variables/commission');

/** @typedef {import('../../utils/variables/commission').CommissionPlaces} CommissionPlaces */

const { Schema } = mongoose;

const mongoSchema = new Schema({
  place: {
    type: String,
    enum: CommissionPlaceList,
    required: true,
    unique: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

class CommissionClass {
  /**
   * @param {CommissionPlaces} place - Where the commission applies
   * @returns The set commission percentage, 0 if none set
   */
  static async get(place) {
    const doc = await this.findOne({ place });
    if (!doc) {
      return 0;
    }
    return doc.percentage;
  }

  /**
   * Set the commission percentage
   * @param {CommissionPlaces} place - Where the commission applies
   * @param {Number} percentage - The commission to apply
   */
  static async set(place, percentage) {
    const doc = await this.findOne({ place });
    if (!doc) {
      await this.create({ place, percentage });
      return;
    }
    doc.percentage = percentage;
    await doc.save();
  }
}
mongoSchema.loadClass(CommissionClass);

const Commission = mongoose.model('Commission', mongoSchema);

module.exports = Commission;
