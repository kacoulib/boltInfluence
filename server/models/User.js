const mongoose = require('mongoose');

const { RoleList, BusinessRoleList, Influencer } = require('../../utils/variables/user');

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
    required: true,
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
    // languages: [{ type: String, enum: LanguageList }],
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
    return ['firstName', 'lastName', 'email', 'slug', 'role'];
  }

  static list(where = {}, { offset = 0, limit = 10 } = {}) {
    return this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('brand')
      .populate('agency')
      .select(this.publicFields());
  }

  static listInfluencers(options) {
    return this.list({ role: Influencer }, options);
  }

  static listBusinesses(options) {
    return this.list({ role: { $in: BusinessRoleList } }, options);
  }

  static async signInOrSignUp({ email }) {
    const user = await this.findOne({ email }).select(this.publicFields());
    return user;
  }
}
mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
