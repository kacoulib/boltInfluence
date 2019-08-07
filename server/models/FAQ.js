const mongoose = require('mongoose');

const { Schema } = mongoose;


const mongoSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
});

class FAQClass {
  static async list({ offset = 0, limit = 5 } = {}) {
    const faqs = await this.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();
    return { faqs };
  }

  /**
   * @param {Object} options
   * @param {String} options.title
   */
  static async add({
    title,
    content
  }) {
    const faqDoc = await this.create({
      title,
      content
    });
    const faq = faqDoc.toObject();
    return { faq };
  }

  static async updateById({
    id,
    title,
    content
  }) {
    const faq = await this.findById(id);
    if (!faq) {
      throw new Error("FAQ not found");
    }
    if (title) faq.title = title;
    if (content) faq.content = content;

    const hasChanges = Boolean(title || content);

    if (hasChanges) {
      await faq.save();
    }

    return { faq };
  }

  static async deleteById({ _id }) {
    await this.deleteOne({ _id });
  }
}

mongoSchema.loadClass(FAQClass);

const FAQ = mongoose.model('FAQ', mongoSchema);

module.exports = FAQ;
