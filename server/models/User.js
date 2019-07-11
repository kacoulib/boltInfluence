const mongoose = require('mongoose');
const _ = require('lodash');

const SocialMediaToken = require('./SocialMediaToken');
const { RoleList, BusinessRoleList, Influencer } = require('../../utils/variables/user');
const { languageList } = require('../../utils/variables/general');
const generateSlug = require('../utils/slugify');
const bcrypt = require('../utils/bcrypt');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    // required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
  notifications: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    // enum: UserStatus,
    required: true,
  },
  role: {
    type: String,
    enum: RoleList,
    required: true,
  },
  // Role-dependant fields
  influencer: {
    picture: String,
    placeOfBirth: String,
    dateOfBirth: Date,
    situation: {
      type: String,
      // enum: UserSituations
    },
    languages: [{ type: String, enum: languageList }],
    // socialMedias: {
    //   google: SocialToken,
    //   instagram: SocialToken
    //   // Other Social Medias
    // },
    // categories: [{ type: String, enum: Categories }]
  },
  brand: {
    type: ObjectId,
    ref: 'Brand',
  },
  agency: [{ type: ObjectId, ref: 'Brand' }],
  // Company related (every user needs a company)
  address: String,
  city: String,
  country: String,
  siret: String,
  companyName: String,
  companySize: {
    type: Number,
    min: 1,
    default: 1,
  },
  // Payment related
  mangoPay: {
    id: String,
    wallet: String,
    bankAccount: String,
    kycDocument: String,
  },
});

class UserClass {
  static publicFields() {
    return ['_id', 'firstName', 'lastName', 'email', 'slug', 'role'];
  }

  /**
   * List a limited amount of Users
   * @param {Object} where - Filtering criterias
   * @param {Object} options
   * @param {Number} options.offset - Amount of Users to skip
   * @param {Number} options.limit - Amount of Users to return
   */
  static async list(where = {}, { offset = 0, limit = 10 } = {}) {
    const users = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('brand')
      .populate('agency')
      .select(this.publicFields());
    return { users };
  }

  static async listInfluencers(options) {
    const { users: influencers } = await this.list({ role: Influencer }, options);
    return { influencers };
  }

  static async listBusinesses(options) {
    const { users: businesses } = await this.list({ role: { $in: BusinessRoleList } }, options);
    return { businesses };
  }

  static async add({ email, password, firstName, lastName, role, picture }) {
    const slug = await generateSlug(this, firstName + lastName);
    const additional = {};
    let status = 'active'; // Change to Enum Value

    if (role === Influencer) {
      additional.influencer = { picture };
    }
    if (email) {
      status = 'waiting email confirmation'; // Change to Enum Value
    }

    const user = await this.create({
      email,
      password,
      slug,
      firstName,
      lastName,
      status,
      role,
      ...additional,
    });

    if (email) {
      // Send Email
    }

    return { user };
  }

  static async signInOrSignUpViaSocialMedia({
    email,
    password,
    provider,
    socialUserId,
    token,
    avatarUrl,
    firstName,
    lastName,
  }) {
    let oldToken = await SocialMediaToken.findOne({ provider, identifier: socialUserId });
    let user;
    if (!oldToken && email) {
      // If the user is unknown via the social id but we have an email
      // Then try to find the user by its email
      user = await this.findOne({ email }).select(this.publicFields());
    } else {
      // If we know the token, then we just get the associated user
      user = await this.findOne({ _id: oldToken.user });
    }
    if (!user) {
      // If the user really does not exist
      // Then we create a new user with the infos we know
      user = (await this.add({
        email,
        password,
        firstName,
        lastName,
        role: Influencer,
        picture: avatarUrl,
      })).user;
    }
    if (!oldToken) {
      // If we don't know the token
      // Then create it
      oldToken = await SocialMediaToken.create({
        provider,
        user: user._id,
        identifier: socialUserId,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    }
    if (
      oldToken.accessToken !== token.accessToken ||
      oldToken.refreshToken !== token.refreshToken
    ) {
      // If the known token is not up to date, update it
      oldToken.accessToken = token.accessToken;
      oldToken.refreshToken = token.refreshToken;
      await oldToken.save();
    }
    user = user.toObject();
    return _.pick(user, this.publicFields());
  }

  static async signInOrSignUpViaEmail({ email, password, avatarUrl, firstName, lastName }) {
    // Authenticating via email + password
    let user = await this.findOne({ email });
    if (!user) {
      // If we don't know the user
      // Then create it and use the newly created one
      user = (await this.add({
        email,
        password,
        firstName,
        lastName,
        role: Influencer,
        picture: avatarUrl,
      })).user;
      user = user.toObject();
      return _.pick(user, this.publicFields());
    }
    if (!user.password) {
      // If the known account does not have a password (if signed up with social media)
      throw new Error('Account has no password.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    user = user.toObject();
    if (isMatch) return _.pick(user, this.publicFields());
    throw new Error('Invalid password');
  }

  static async signInOrSignUp(options) {
    const { email, password, provider, socialUserId, token } = options;

    if (provider && socialUserId && token) {
      return this.signInOrSignUpViaSocialMedia(options);
    }
    if (email && password) {
      return this.signInOrSignUpViaEmail(options);
    }
    throw new Error(
      'Invalid SignIn/Up method, either use email + password or use social media login.',
    );
  }
}
mongoSchema.loadClass(UserClass);
mongoSchema.pre('save', async function userPreSave() {
  const user = this;
  // only hash the password if it exists and it has been modified (or is new)
  if (!user.password || !user.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

const User = mongoose.model('User', mongoSchema);

module.exports = User;

/* Information needed by MangoPay */
/* User Type:                     */
/*   Influencer:   SoleTrader     */
/*   Agency/Brand: Business       */
/* Birthday                       */
/* Country of residence           */
/* Nationality                    */
/* First name                     */
/* Last name                      */
/* Company Name                   */
/* Email                          */
/* Phone Number                   */

/* We need to create a MangoPay user                                                  */
/* Then create its MangoPay wallet                                                    */
/* Then create its MangoPay Bank Account                                              */
/* Then let the user upload its KYC docs                                              */
/* We need to set up a webhook to listen for MangoPay events such as document success */

/* TODO: Open a MangoPay account                            */
/* TODO: Create a MangoPay sandbox                          */
/* TODO: Incrementally set up the MangoPay integration flow */

/* TODO: Set up the limitations on the audience when trying to sign up with a social media */
