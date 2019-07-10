const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

class BrandClass {
  static list({ offset = 0, limit = 10 } = {}) {
    return this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
  }
}
mongoSchema.loadClass(BrandClass);

const Brand = mongoose.model('Brand', mongoSchema);

module.exports = Brand;
