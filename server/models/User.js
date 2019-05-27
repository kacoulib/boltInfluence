const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');
const sendEmail = require('../aws');
const { getEmailTemplate } = require('./EmailTemplate');
const logger = require('../logs');
const { Admin, Influencer, Enterprise } = require('../../utils/variables/user')
const { Schema } = mongoose;
const providerTokenType = { google: 'google', instagram: 'instagram' };

const mongoSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  instagramId: {
    type: String,
    unique: true,
  },
  instagramToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: [Admin, Influencer, Enterprise],
    default: Influencer,
    required: true
  },
  displayName: String,
  avatarUrl: String,
});

class UserClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'avatarUrl', 'slug', 'role'];
  }

  static async signInOrSignUp({ provider, socialUserId, email, token, displayName, avatarUrl, role = Influencer }) {
    const data = {};

    if (provider == providerTokenType.google) {
      data.id = 'googleId'
      data.token = 'googleToken'
    } else if (provider == providerTokenType.instagram) {
      data.id = 'instagramId'
      data.token = 'instagramToken'
    }

    const user = await this.findOne({ [data.id]: socialUserId }).select(UserClass.publicFields().join(' '));

    if (user) {
      const modifier = {};

      if (token.accessToken) {
        modifier.access_token = token.accessToken;
      }

      if (token.refreshToken) {
        modifier.refresh_token = token.refreshToken;
      }

      if (_.isEmpty(modifier)) {
        return user;
      }

      await this.updateOne({ [data.id]: socialUserId }, { $set: modifier });

      return user;
    }

    const slug = await generateSlug(this, displayName);

    const newUser = await this.create({
      createdAt: new Date(),
      [data.id]: socialUserId,
      [data.token]: token,
      email,
      displayName,
      avatarUrl,
      slug,
      role
    });

    const template = await getEmailTemplate('welcome', {
      userName: displayName,
    });

    // try {
    //   await sendEmail({
    //     from: `Kelly from Builder Book <${process.env.EMAIL_SUPPORT_FROM_ADDRESS}>`,
    //     to: [email],
    //     subject: template.subject,
    //     body: template.message,
    //   });
    // } catch (err) {
    //   logger.error('Email sending error:', err);
    // }

    return _.pick(newUser, UserClass.publicFields());
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
