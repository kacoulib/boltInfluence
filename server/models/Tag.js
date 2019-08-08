const mongoose = require('mongoose');

const { Schema } = mongoose;


const mongoSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
});

class TagClass {
  static async list(where = {}, { offset = 0, limit = 10 } = {}) {

    console.log('ok--------', where)

    const tags = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    return { tags };
  }

  /**
   * @param {Object} options
   * @param {String} options.title
   */
  static async add({
    title,
  }) {
    const tagDoc = await this.create({
      title,
    });
    const tag = tagDoc.toObject();
    return { tag };
  }

  static async updateById({
    id,
    title,
  }) {
    const tag = await this.findById(id);
    if (!tag) {
      throw new Error("Tag not found");
    }
    if (title) tag.title = title;

    const hasChanges = Boolean(title);

    if (hasChanges) {
      await tag.save();
    }

    return { tag };
  }

  static async deleteById({ _id }) {
    await this.deleteOne({ _id });
  }
}

mongoSchema.loadClass(TagClass);

const Tag = mongoose.model('Tag', mongoSchema);

module.exports = Tag;
