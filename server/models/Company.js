/* eslint-disable no-use-before-define */

const mongoose = require('mongoose');
const frontmatter = require('front-matter');
const generateSlug = require('../utils/slugify');
// const Chapter = require('./Chapter');
const { getCommits, getContent } = require('../auth/github');
const { UserNotFound } = require('../../utils/variables/error')
const logger = require('../logs');
const User = require('./User');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo: String,
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
});

class CompanyClass {
  static async add({ userId, name, logo, address, city, zip, country } = {}) {
    const user = await User.findById(userId).lean()

    if (!user) {
      throw new Error(UserNotFound);
    }

    return await this.create({ userId, name, logo, address, city, zip, country });
  }

  static async getCompanyUser(id) {
    return this.findById(id)
  }
}

mongoSchema.loadClass(CompanyClass);

const Company = mongoose.model('Company', mongoSchema);

module.exports = Company;

const Chapter = require('./Chapter');
