const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

class CategoryClass {
  static async list(where = {}, { offset = 0, limit = 10 } = {}) {
    const categories = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();
    return { categories };
  }

  /**
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.color
   */
  static async add({ title, color }) {
    const categoryDoc = await this.create({
      title,
      color,
    });
    const category = categoryDoc.toObject();
    return { category };
  }

  static async updateById({ id, title, color }) {
    const category = await this.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    if (title) category.title = title;
    if (color) category.color = color;

    const hasChanges = Boolean(title || color);

    if (hasChanges) {
      await category.save();
    }

    return { category };
  }

  static async deleteById({ _id }) {
    await this.deleteOne({ _id });
  }
}

mongoSchema.loadClass(CategoryClass);

const Category = mongoose.model('Category', mongoSchema);

module.exports = Category;
