const mongoose = require('mongoose');

const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


const mongoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
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
  // author: {
  //   type: String,
  //   required: true,
  // },
  categories: [{ type: ObjectId, ref: 'User' }],
  categories: [{ type: ObjectId, ref: 'Category' }],
  tags: [{ type: ObjectId, ref: 'Tag' }],
  created_at: { type: Date, default: Date.now },
});

class ArticleClass {
  static async list(where = {}, { offset = 0, limit = 10 } = {}) {
    const articles = await this.find(where)
      .populate('categories')
      .populate('tags')
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
   * @param {Array<String>} options.tags
   * @param {Array<String>} options.categories
   */
  static async add({
    title,
    content,
    author,
    picture,
    tags,
    categories
  }) {
    const slug = await generateSlug(this, title);
    const articleDoc = await this.create({
      title,
      picture,
      slug,
      content,
      author,
      tags,
      categories
    });
    const article = articleDoc.toObject();
    return { article };
  }

  static async getBySlug({ slug }) {
    const article = await this.findOne({ slug })
      .populate('categories')
      .populate('tags')
      .exec()

    if (!article) {
      throw new Error("Article not found");
    }
    return { article };
  }

  static async updateBySlug({
    slug,
    title,
    picture,
    content,
    tags,
    categories
  }) {
    const { article } = await this.getBySlug({ slug });

    if (title) article.title = title;
    if (content) article.content = content;
    if (tags) article.tags = tags;
    if (categories) article.categories = categories;
    if (picture) article.picture = picture;

    const hasChanges = Boolean(title || content || tags || categories || picture);

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
