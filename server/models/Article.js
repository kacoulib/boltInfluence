const mongoose = require('mongoose');

const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  social_medias: [{
    //
  }],
  tags: [String],
});

class ArticleClass {
  static async list(where = {}, { offset = 0, limit = 10 } = {}) {
    const articles = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();
    return { articles };
  }

  /**
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.content
   * @param {String} options.author
   * @param {Array<String>} options.social_medias
   * @param {Array<String>} options.tags
   */
  static async add({
    title,
    content,
    author,
    social_medias,
    tags,
  }) {
    const slug = await generateSlug(this, title);
    const articleDoc = await this.create({
      title,
      slug,
      content,
      author,
      // social_medias,
      tags,
    });
    const article = articleDoc.toObject();
    return { article };
  }

  static async getBySlug({ slug }) {
    const article = await this.findOne({ slug });
    if (!article) {
      throw new Error("Article not found");
    }
    return { article };
  }

  static async updateBySlug({
    slug,
    title,
    content,
    tags,
  }) {
    const { article } = await this.getBySlug({ slug });

    if (title) article.title = title;
    if (content) article.content = content;
    if (tags) article.tags = tags;

    const hasChanges = Boolean(title || content || tags);

    if (hasChanges) {
      await article.save();
    }

    return { article };
  }

  static async deleteBySlug({ slug }) {
    await this.deleteOne({ slug });
  }
}

mongoSchema.loadClass(ArticleClass);

const Article = mongoose.model('Article', mongoSchema);

module.exports = Article;
