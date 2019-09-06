const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    media: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { timestamps: true },
);

class SignUpMediaThresholdClass {
  static async getForMedia({ media }) {
    const simt = await this.findOne({ media })
      .select('value')
      .lean();
    if (simt === null) return null;
    return simt.value;
  }
}
mongoSchema.loadClass(SignUpMediaThresholdClass);

const SignUpMediaThreshold = mongoose.model('SignUpMediaThreshold', mongoSchema);

module.exports = SignUpMediaThreshold;
