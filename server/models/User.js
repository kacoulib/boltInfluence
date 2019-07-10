const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const SocialMediaToken = require('./SocialMediaToken');
const { RoleList, BusinessRoleList, Influencer } = require('../../utils/variables/user');
const { languageList } = require('../../utils/variables/general');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const comparePassword = (test, ground) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(test, ground, (err, isMatch) => {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });
};

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
  companySize: {
    type: Number,
    min: 1,
    default: 1,
  },
});

class UserClass {
  static publicFields() {
    return ['_id', 'firstName', 'lastName', 'email', 'slug', 'role'];
  }

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

  static async signInOrSignUp({
    email,
    password,
    provider,
    socialUserId,
    token,
    avatarUrl,
    displayName,
    firstName,
    lastName,
  }) {
    if (provider && socialUserId && token) {
      // Authenticating via Social Media
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
        const slug = await generateSlug(this, displayName || firstName + lastName);
        user = await this.create({
          email,
          password,
          slug,
          firstName: firstName || displayName,
          lastName: lastName || displayName,
          status: 'active',
          role: Influencer,
          influencer: { picture: avatarUrl },
        });
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
    if (email && password) {
      // Authenticating via email + password
      let user = await this.findOne({ email });
      if (!user) {
        // If we don't know the user
        // Then create it and use the newly created one
        const slug = await generateSlug(this, displayName || firstName + lastName);
        user = await this.create({
          email,
          password,
          slug,
          firstName: firstName || displayName,
          lastName: lastName || displayName,
          status: 'active',
          role: Influencer,
          influencer: { picture: avatarUrl },
        });
        user = user.toObject();
        return _.pick(user, this.publicFields());
      }
      if (!user.password) {
        // If the known account does not have a password (if signed up with social media)
        throw new Error('Account has no password.');
      }
      const isMatch = await comparePassword(password, user.password);
      user = user.toObject();
      if (isMatch) return _.pick(user, this.publicFields());
      throw new Error('Invalid password');
    }
    throw new Error(
      'Invalid SignIn/Up method, either use email + password or use social media login.',
    );
  }
}
mongoSchema.loadClass(UserClass);
mongoSchema.pre('save', function userPreSave(next) {
  const user = this;
  // only hash the password if it exists and it has been modified (or is new)
  if (!user.password || !user.isModified('password')) {
    return next();
  }
  // password changed so we need to hash it (generate a salt)
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model('User', mongoSchema);

module.exports = User;
