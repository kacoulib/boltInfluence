const mongoose = require('mongoose');
const _ = require('lodash');

const KycValidation = require('./KycValidation');
const SocialMediaToken = require('./SocialMediaToken');
const { RoleList, BusinessRoleList, Influencer } = require('../../utils/variables/user');
const { languageCodeList } = require('../../utils/variables/general');
const { isInfluencer, isBusiness } = require('../../utils/variables/user');
const generateSlug = require('../utils/slugify');
const bcrypt = require('../utils/bcrypt');
const { getMangopay, createWallet, createOrUpdateIbanBankAccount } = require('../utils/mangopay');

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
    situation: {
      type: String,
      // enum: UserSituations
    },
    languages: [{ type: String, enum: languageCodeList }],
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
  phoneNumber: String,
  address: String,
  city: String,
  country: String,
  postalCode: String,
  siret: String,
  companyEmail: String,
  companyName: String,
  companySize: {
    type: Number,
    min: 1,
    default: 1,
  },
  placeOfBirth: String,
  dateOfBirth: Date,
  // Payment related
  mangopay: {
    id: String,
    wallet: String,
    bankAccount: String,
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

  /**
   * Get a User by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the User to get
   */
  static async getBySlug({ slug }) {
    const userDoc = await this.findOne({ slug }).select(this.publicFields());
    if (!userDoc) {
      throw new Error('User not found');
    }
    const user = userDoc.toObject();
    return { user };
  }

  /**
   * Update a User by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the User to get
   * @param {...Object} params.updates - The updates to apply
   * @todo Validate updates
   */
  static async updateBySlug({ slug, ...updates }) {
    const userDoc = await this.findOne({ slug });
    if (!userDoc) {
      throw new Error('User not found');
    }
    Object.entries(updates).forEach(([key, value]) => {
      userDoc[key] = value;
    });
    await userDoc.save();
    const user = _.pick(userDoc.toObject(), this.publicFields());
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

  /**
   * Add a KYC document to be validated for a user given its slug
   * @param {Object} options
   * @param {String} options.slug - User slug
   * @param {String} options.file - Base64-encoded KYC Document
   * @param {String} options.type - KYC Document Type (Identity or Registration proof)
   */
  static async addKycDocumentBySlug({ slug, file, type }) {
    const user = await this.findOne({ slug }).select('mangopay.id');

    if (!user) {
      throw new Error('User not found');
    }
    if (!user.mangopay.id) {
      throw new Error('User is not linked to MangoPay');
    }

    const mangopay = getMangopay();
    let model = new mangopay.models.KycDocument({ Type: type });
    let mangopayKycDocument = await mangopay.Users.createKycDocument(user.mangopay.id, model);

    model = new mangopay.models.KycPage({ File: file });
    await mangopay.Users.createKycPage(user.mangopay.id, mangopayKycDocument.Id, model);
    model = new mangopay.models.KycDocument({
      Id: mangopayKycDocument.Id,
      Status: mangopay.models.KycDocumentStatus.ValidationAsked,
    });
    mangopayKycDocument = await mangopay.Users.updateKycDocument(user.mangopay.id, model);
    await KycValidation.addOrUpdate({
      user: user._id,
      documentId: mangopayKycDocument.Id,
      documentType: type,
      status: mangopayKycDocument.Status,
    });
  }

  static addIdentityProofBySlug({ slug, file }) {
    const mangopay = getMangopay();
    return this.addKycDocumentBySlug({
      slug,
      file,
      type: mangopay.models.KycDocumentType.IdentityProof,
    });
  }

  static addRegistrationProofBySlug({ slug, file }) {
    const mangopay = getMangopay();
    return this.addKycDocumentBySlug({
      slug,
      file,
      type: mangopay.models.KycDocumentType.RegistrationProof,
    });
  }
}
mongoSchema.loadClass(UserClass);

mongoSchema.pre('save', async function userPreSavePassword() {
  const user = this;
  // only hash the password if it exists and it has been modified (or is new)
  if (!user.password || !user.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

mongoSchema.pre('save', async function userPreSaveMangopayUser() {
  const user = this;
  const checkProperties = [
    'role',
    'dateOfBirth',
    'country',
    'placeOfBirth',
    'firstName',
    'lastName',
    'companyName',
    'companyEmail',
    'siret',
  ];
  const hasAll = checkProperties.every((p) => !!user[p]);
  const hasOneModified = checkProperties.some((p) => user.isModified(p));
  if (!hasAll || !hasOneModified || (!isInfluencer(user) && !isBusiness(user))) {
    return;
  }
  const mangopay = getMangopay();
  const mangopayUserModel = new mangopay.models.UserLegal({
    Name: user.companyName,
    Email: user.companyEmail,
    CompanyNumber: user.siret,
    LegalPersonType: isInfluencer(user) ? 'SOLETRADER' : 'BUSINESS',
    LegalRepresentativeFirstName: user.firstName,
    LegalRepresentativeLastName: user.lastName,
    LegalRepresentativeBirthday: Math.trunc(user.dateOfBirth.getTime() / 1000),
    LegalRepresentativeNationality: user.placeOfBirth,
    LegalRepresentativeCountryOfResidence: user.country,
  });
  if (!user.mangopay.id) {
    const mangopayUser = await mangopay.Users.create(mangopayUserModel);
    user.mangopay.id = mangopayUser.Id;
  } else {
    await mangopay.Users.update({ ...mangopayUserModel, Id: user.mangopay.id });
  }
});

mongoSchema.pre('save', async function userPreSaveMangopayWallet() {
  const user = this;

  if (!user.mangopay.id || user.mangopay.wallet) {
    return;
  }

  const { wallet } = await createWallet({
    owner: user.mangopay.id,
    description: `User ${user.slug}`,
  });
  user.mangopay.wallet = wallet.Id;
});

mongoSchema.pre('save', async function userPreSaveMangopayBankAccount() {
  const user = this;

  if (
    !user.mangopay.id ||
    !user.iban ||
    !user.bic ||
    !user.address ||
    !user.city ||
    !user.country ||
    !user.postalCode ||
    !user.firstName ||
    !user.lastName
  ) {
    return;
  }
  user.mangopay.bankAccount = await createOrUpdateIbanBankAccount({
    user: user.mangopay.id,
    name: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    country: user.country,
    postalCode: user.postalCode,
    iban: user.iban,
    bic: user.bic,
    oldBankAccountId: user.mangopay.bankAccount,
  });
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
/* Company Number                 */

/* DONE: We need to create a MangoPay user                                                  */
/* DONE: Then create its MangoPay wallet                                                    */
/* DONE: Then create its MangoPay Bank Account                                              */
/* DONE: Then let the user upload its KYC docs                                              */
/* DONE: We need to set up a webhook to listen for MangoPay events such as document success */

/* DONE: Open a MangoPay account                            */
/* DONE: Create a MangoPay sandbox                          */
/* WIP : Incrementally set up the MangoPay integration flow */

/* TODO: Set up the limitations on the audience when trying to sign up with a social media */
