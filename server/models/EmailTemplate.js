const mongoose = require('mongoose');
const _ = require('lodash');

const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

class EmailTemplateClass {
  static async list({ offset = 0, limit = 10 } = {}) {
    const templates = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();
    return { templates };
  }

  static async add({ name, subject, message }) {
    const slug = await generateSlug(this, name);
    const templateDoc = await this.create({
      name,
      slug,
      subject,
      message,
    });
    const template = templateDoc.toObject();
    return { template };
  }

  /**
   * Fill a template with given parameters.
   * @param {Object} options
   * @param {Object} options.template
   * @param {String} options.template.message
   * @param {String} options.template.subject
   * @param {Object} options.params
   */
  static async fill({ template, params }) {
    return {
      template: {
        ...template,
        message: _.template(template.message)(params),
        subject: _.template(template.subject)(params),
      },
    };
  }

  static async get(where) {
    const template = await this.findOne(where).lean();
    if (!template) {
      throw new Error(`EmailTemplate not found`);
    }
    return { template };
  }

  static async getFilled(where, params) {
    const { template } = await this.get(where);
    return this.fill({ template, params });
  }

  static getByName({ name }) {
    return this.get({ name });
  }

  /**
   * Get a template by its name and fill given parameters.
   * @param {Object} options
   * @param {String} options.name
   * @param {Object} options.params
   */
  static async getFilledByName({ name, params }) {
    return this.getFilled({ name }, params);
  }

  static getBySlug({ slug }) {
    return this.get({ slug });
  }

  /**
   * Get a template by its slug and fill given parameters.
   * @param {Object} options
   * @param {String} options.slug
   * @param {Object} options.params
   */
  static async getFilledBySlug({ slug, params }) {
    return this.getFilled({ slug }, params);
  }
}

mongoSchema.loadClass(EmailTemplateClass);

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

module.exports = EmailTemplate;
