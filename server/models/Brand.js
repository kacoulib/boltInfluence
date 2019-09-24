const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const generateSlug = require('../utils/slugify');


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
  static async list({ offset = 0, limit = 10 } = {}) {
    const brands = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return { brands };
  }

  /**
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.color
   */
  static async add({
    name,
    contact,
    picture,
    description
  }) {
    const slug = await generateSlug(name);
    const brandDoc = await this.create({
      name,
      contact,
      slug,
      picture,
      description
    });

    const brand = brandDoc.toObject();
    return { brand };
  }
  /**
   * Update a Brand
   * @param {Object} options
   * @param {ObjectId} options.brandId
   * @param {String} options.name
   * @param {String} options.contact
   * @param {String} options.picture
   * @param {String} options.description
   */
  static async updateById({ brandId, ...updates }) {
    const brandDoc = await this.findById(brandId);
    if (!brandDoc) {
      throw new Error('Brand not found');
    }
    Object.entries(updates)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        brandDoc[key] = value;
      });
    await brandDoc.save();
    const brand = brandDoc.toObject();
    return { brand };
  }
}
mongoSchema.loadClass(BrandClass);

const Brand = mongoose.model('Brand', mongoSchema);

module.exports = Brand;
