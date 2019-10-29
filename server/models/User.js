const mongoose = require('mongoose');
const _ = require('lodash');

const CenterOfInterest = require('./CenterOfInterest');
const Ubo = require('./Ubo');
const Stat = require('./Stat');
const KycValidation = require('./KycValidation');
const SocialMediaToken = require('./SocialMediaToken');
const SignUpMediaThreshold = require('./SignUpMediaThreshold');
const {
  RoleList,
  BusinessRoleList,
  Influencer,
  isBrand,
  isAgency,
  StatusList,
  Active,
} = require('../../utils/variables/user');
const { languageCodeList, } = require('../../utils/variables/general');
const { userPublicFields, userProtectedFields, isBusiness, categoryList, activityList, civilStateList, genderList } = require('../../utils/variables/user');
const generateSlug = require('../utils/slugify');
const bcrypt = require('../utils/bcrypt');
const {
  getMangopay,
  createWallet,
  createOrUpdateIbanBankAccount,
  preregisterCard,
  // createOrUpdateUbo,
  createUboDeclaration,
  submitUboDeclaration,
} = require('../utils/mangopay');
const { getStats } = require('../utils/socialmedias');
const logger = require('../logs');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  picture: String,
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
    enum: StatusList,
    required: true,
  },
  role: {
    type: String,
    enum: RoleList,
    required: true,
  },
  categories: [{ type: String, enum: categoryList }],
  // Role-dependant fields
  influencer: {
    situation: {
      type: String,
      // enum: UserSituations
    },
    haveChildren: {
      type: Boolean,
      default: false
    },
    deliveryAddress: String,
    interests: [{ type: String, enum: activityList }],
    languages: [{ type: String, enum: languageCodeList }],
    gender: { type: String, enum: genderList },
    civilState: { type: String, enum: civilStateList },
    centersOfInterest: [{ type: ObjectId, ref: 'CenterOfInterest' }],
    feedback: [
      {
        giver: { type: ObjectId, ref: 'User' },
        date: Date,
        text: String,
        notes: Number,
      }
    ],

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
    unique: true,
    sparse: true,
  },
  agency: [{ type: ObjectId, ref: 'Brand' }],
  // UBO is a requirement for businesses (Brands & Agencies)
  ubo: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    nationality: String,
    birthday: Date,
    birthcity: String,
    birthcountry: String,
  },
  // Company related (every user needs a company)
  phone: String,
  address: String,
  bio: String,
  city: String,
  country: String,
  postalCode: String,
  siret: String,
  iban: String,
  rib: String,
  bic: String,
  paypal: String,
  factureAddress: String,
  companyEmail: String,
  companyName: String,
  companyType: String,
  factureCity: String,
  facturePostalCode: String,
  companySize: {
    type: Number,
    min: 1,
    default: 1,
  },
  placeOfBirth: String,
  dateOfBirth: Date,
  // Payment related
  mangopay: {
    id: {
      type: String,
      unique: true,
      sparse: true,
    },
    wallet: String,
    bankAccount: String,
    ubo: String,
    uboDeclaration: String,
  },
});

class UserClass {
  static publicFields() {
    return userPublicFields;
  }

  static protectedFields() {
    return [
      ...userPublicFields,
      ...userProtectedFields,
    ];
  }
  static influencerFields() {
    return ['haveChildren', 'deliveryAddress', 'interests', 'languages', 'gender', 'civilState', 'centersOfInterest', 'feedback', 'categories', 'interests']
  }

  /**
   * List a limited amount of Users
   * @param {Object} [where] - Filtering criterias
   * @param {Object} [options]
   * @param {Number} [options.offset] - Amount of Users to skip
   * @param {Number} [options.limit] - Amount of Users to return
   */
  static async list(where = {}, { offset = 0, limit = 10 } = {}) {
    const users = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('brand')
      .populate('agency')
      .populate('influencer.centersOfInterest')
      .select(this.publicFields())
      .lean();
    users.forEach(u => {
      if (u.influencer && u.influencer.centersOfInterest) {
        u.influencer.centersOfInterest =
          u.influencer.centersOfInterest.map(coi => coi.name);
      }
    });
    return { users };
  }

  static async getId(where) {
    const user = await this.findOne(where)
      .select('_id')
      .lean();
    if (!user) {
      return { userId: null };
    }
    return { userId: user._id };
  }

  static async getIdBySlug({ slug }) {
    return this.getId({ slug });
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
    const status = Active; // Change to Enum Value

    // if (role === Influencer) {
    //   additional.influencer = { picture };
    // }

    const user = await this.create({
      email,
      picture,
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
    const userDoc = await this.findOne({ slug })
      .select(this.publicFields())
      .populate('brand')
      .populate('agency')
      .populate('influencer.centersOfInterest');
    if (!userDoc) {
      throw new Error('User not found');
    }
    const user = userDoc.toObject();
    if (user.influencer && user.influencer.centersOfInterest) {
      user.influencer.centersOfInterest =
        user.influencer.centersOfInterest.map(coi => coi.name);
    }
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
    Object.entries(updates)
      .filter(([key, value]) => value !== undefined && !['influencer', ...this.influencerFields()].includes(key))
      .forEach(([key, value]) => {
        userDoc[key] = value;
      });
    if (updates.influencer) {
      if (updates.influencer.centersOfInterest) {
        if (!Array.isArray(updates.influencer.centersOfInterest)) {
          throw new Error('centersOfInterest must be an array')
        }
        const ids = await Promise.all(
          updates.influencer.centersOfInterest.map(coi => CenterOfInterest.getIdByName({
            name: coi
          }))
        );
        userDoc.influencer.centersOfInterest = ids;
      }
    }
    this.influencerFields().map(e => updates[e] ? userDoc.influencer[e] = updates[e] : '')

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
    } else if (oldToken) {
      // If we know the token, then we just get the associated user
      user = await this.findOne({ _id: oldToken.user });
    }
    if (!user) {
      // If the user really does not exist
      // Then we create a new user with the infos we know
      // Except if the stats (number of subscribers / followers) are not high enough
      const threshold = await SignUpMediaThreshold.getForMedia({ media: provider });
      if (threshold !== null) {
        const { stats } = await getStats({ provider, ...token });
        if (stats.value < threshold) {
          throw new Error('Stats not high enough to sign up');
        }
      }
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
        accessTokenSecret: token.accessTokenSecret,
      });
    }
    if (
      oldToken.accessToken !== token.accessToken ||
      oldToken.refreshToken !== token.refreshToken ||
      oldToken.accessTokenSecret !== token.accessTokenSecret ||
      oldToken.user !== user._id
    ) {
      // If the known token is not up to date, update it
      oldToken.accessToken = token.accessToken;
      oldToken.refreshToken = token.refreshToken;
      oldToken.accessTokenSecret = token.accessTokenSecret;
      oldToken.user = user._id;
      await oldToken.save();
    }
    user = user.toObject();
    this.getStatsById({ userId: user._id })
      .then(({ stats }) =>
        Stat.addOrUpdateManyForUserById(stats.map((s) => ({ user: user._id, ...s }))),
      )
      .catch((err) => logger.error(err.message));
    return _.pick(user, this.publicFields());
  }

  static async signInOrSignUpViaEmail({ email, password, avatarUrl, firstName, lastName, role }) {
    // Authenticating via email + password
    let user = await this.findOne({ email });
    if (!user) {
      if (!role || !isBusiness({ role })) {
        throw new Error('Signing up with an email means you need a business role.');
      }
      // If we don't know the user
      // Then create it and use the newly created one
      user = (await this.add({
        email,
        password,
        firstName,
        lastName,
        role,
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

  static addArticlesOfAssociationBySlug({ slug, file }) {
    const mangopay = getMangopay();
    return this.addKycDocumentBySlug({
      slug,
      file,
      type: mangopay.models.KycDocumentType.ArticlesOfAssociation,
    });
  }

  static async preregisterCardBySlug({ slug, cardType, currency }) {
    const user = await this.findOne({ slug }).select('mangopay.id');
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.mangopay.id) {
      throw new Error('User is not linked to MangoPay');
    }
    const { registration } = await preregisterCard({ user: user.mangopay.id, cardType, currency });
    return {
      registration: {
        registrationId: registration.Id,
        preregistrationData: registration.PreregistrationData,
        accessKey: registration.AccessKey,
        registrationUrl: registration.CardRegistrationURL,
      },
    };
  }

  /**
   * Get a brand, only if the user has ownership of it
   * @param {Object} options
   * @param {String} options.user - User slug
   * @param {String} options.brand - Brand slug
   */
  static async getBrandBySlug({ user: userSlug, brand: brandSlug }) {
    const user = await this.findOne({ slug: userSlug })
      .select(['role', 'brand', 'agency'])
      .populate('brand')
      .populate('agency');

    if (!user) {
      return { brand: null };
    }

    let brand = null;

    if (isBrand(user) && user.brand.slug === brandSlug) {
      brand = user.brand;
    }
    if (isAgency(user)) {
      user.agency.some((b) => {
        const has = b.slug === brandSlug;
        if (has) {
          brand = b;
        }
        return has;
      });
    }
    return { brand };
  }

  static async getStatsById({ userId }) {
    const socialMediaTokens = await SocialMediaToken.find({ user: userId });
    const data = await Promise.all(socialMediaTokens.map(getStats));
    const stats = data.map((d) => d.stats);
    return { stats };
  }

  static async hasBrandById({ brandId, user: userSlug }) {
    const owned = !!(await this.getId({
      $and: [{ slug: userSlug }, { $or: [{ brand: brandId }, { agency: brandId }] }],
    })).userId;
    return owned;
  }

  static async getUbosBySlug({ slug }) {
    const user = await this.findOne({ slug })
      .select('_id')
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    const { ubos } = await Ubo.getAllByUserId({ user: user._id });

    return { ubos };
  }

  static async createOrUpdateUbosBySlug({ slug, ubos }) {
    const user = await this.findOne({ slug })
      .select('_id')
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    return Ubo.createOrUpdateManyByUserId({ user: user._id, ubos });
  }

  static async submitUboDeclarationBySlug({ slug }) {
    const user = await this.findOne({ slug })
      .select(['_id', 'mangopay.id', 'mangopay.uboDeclaration'])
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    const { ubos } = await Ubo.getAllByUserId({ user: user._id });

    // TODO: Create/Update the Ubos, submit the UboDeclaration
    // If there's already a UboDeclaration waiting, throw an error
    await submitUboDeclaration({
      user: user.mangopay.id,
      uboDeclaration: user.mangopay.uboDeclaration,
    });
  }

  // static async submitUboDeclarationBySlug({ slug }) {
  //   const user = await this.findOne({ slug })
  //     .select(['mangopay.id', 'mangopay.ubo', 'mangopay.uboDeclaration'])
  //     .lean();
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   if (!user.mangopay.ubo || !user.mangopay.uboDeclaration) {
  //     throw new Error('User has no UBO to submit');
  //   }
  //   const { uboDeclaration } = await submitUboDeclaration({
  //     user: user.mangopay.id,
  //     ubos: [user.mangopay.ubo],
  //     uboDeclaration: user.mangopay.uboDeclaration,
  //   });
  //   console.log(uboDeclaration);
  // }

  // static async createOrUpdateUboBySlug({
  //   slug,
  //   firstName,
  //   lastName,
  //   address,
  //   city,
  //   postalCode,
  //   country,
  //   nationality,
  //   birthday,
  //   birthcountry,
  //   birthcity,
  // }) {
  //   const user = await this.findOne({ slug });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   if (firstName) user.ubo.firstName = firstName;
  //   if (lastName) user.ubo.lastName = lastName;
  //   if (address) user.ubo.address = address;
  //   if (city) user.ubo.city = city;
  //   if (postalCode) user.ubo.postalCode = postalCode;
  //   if (country) user.ubo.country = country;
  //   if (nationality) user.ubo.nationality = nationality;
  //   if (birthday) user.ubo.birthday = birthday;
  //   if (birthcountry) user.ubo.birthcountry = birthcountry;
  //   if (birthcity) user.ubo.birthcity = birthcity;
  //   const hasChanges = Boolean(
  //     firstName ||
  //       lastName ||
  //       address ||
  //       city ||
  //       postalCode ||
  //       country ||
  //       nationality ||
  //       birthday ||
  //       birthcountry ||
  //       birthcity,
  //   );
  //   if (hasChanges) {
  //     await user.save();
  //   }
  //   if (
  //     user.ubo.firstName &&
  //     user.ubo.lastName &&
  //     user.ubo.address &&
  //     user.ubo.city &&
  //     user.ubo.postalCode &&
  //     user.ubo.country &&
  //     user.ubo.nationality &&
  //     user.ubo.birthday &&
  //     user.ubo.birthcountry &&
  //     user.ubo.birthcity
  //   ) {
  //     try {
  //       const { ubo, uboDeclaration } = await createOrUpdateUbo({
  //         ...user.ubo,
  //         user: user.mangopay.id,
  //         ubo: user.mangopay.ubo,
  //         uboDeclaration: user.mangopay.uboDeclaration,
  //       });
  //       user.mangopay.ubo = ubo.Id;
  //       user.mangopay.uboDeclaration = uboDeclaration.Id;
  //       await user.save();
  //     } catch (err) {
  //       console.error(err);
  //       throw err;
  //     }
  //   }
  //   console.log(user.toObject());
  // }
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

// mongoSchema.pre('save', async function userPreSaveMangopayUser() {
//   const user = this;
//   const checkProperties = [
//     'role',
//     'dateOfBirth',
//     'country',
//     'placeOfBirth',
//     'firstName',
//     'lastName',
//     'companyName',
//     'companyEmail',
//     'siret',
//   ];
//   const hasAll = checkProperties.every((p) => !!user[p]);
//   const hasOneModified = checkProperties.some((p) => user.isModified(p));
//   if (!hasAll || !hasOneModified || (!isInfluencer(user) && !isBusiness(user))) {
//     return;
//   }
//   const mangopay = getMangopay();
//   const mangopayUserModel = new mangopay.models.UserLegal({
//     Name: user.companyName,
//     Email: user.companyEmail,
//     CompanyNumber: user.siret,
//     LegalPersonType: isInfluencer(user) ? 'SOLETRADER' : 'BUSINESS',
//     LegalRepresentativeFirstName: user.firstName,
//     LegalRepresentativeLastName: user.lastName,
//     LegalRepresentativeBirthday: Math.trunc(user.dateOfBirth.getTime() / 1000),
//     LegalRepresentativeNationality: user.placeOfBirth,
//     LegalRepresentativeCountryOfResidence: user.country,
//   });
//   if (!user.mangopay.id) {
//     const mangopayUser = await mangopay.Users.create(mangopayUserModel);
//     user.mangopay.id = mangopayUser.Id;
//   } else {
//     await mangopay.Users.update({ ...mangopayUserModel, Id: user.mangopay.id });
//   }
// });

// mongoSchema.pre('save', async function userPreSaveMangopayWallet() {
//   const user = this;
// 
//   if (!user.mangopay.id || user.mangopay.wallet) {
//     return;
//   }
// 
//   const { wallet } = await createWallet({
//     owner: user.mangopay.id,
//     description: `User ${user.slug}`,
//   });
//   user.mangopay.wallet = wallet.Id;
// });

// mongoSchema.pre('save', async function userPreSaveMangopayUboDeclaration() {
//   const user = this;
// 
//   if (!isBusiness(user) || !user.mangopay.id || user.mangopay.uboDeclaration) {
//     return;
//   }
// 
//   const { uboDeclaration } = await createUboDeclaration({ user: user.mangopay.id });
//   user.mangopay.uboDeclaration = uboDeclaration.Id;
// });

// mongoSchema.pre('save', async function userPreSaveMangopayBankAccount() {
//   const user = this;
// 
//   if (
//     !user.mangopay.id ||
//     !user.iban ||
//     !user.bic ||
//     !user.address ||
//     !user.city ||
//     !user.country ||
//     !user.postalCode ||
//     !user.firstName ||
//     !user.lastName
//   ) {
//     return;
//   }
//   const { bankAccount } = await createOrUpdateIbanBankAccount({
//     user: user.mangopay.id,
//     name: `${user.firstName} ${user.lastName}`,
//     address: user.address,
//     city: user.city,
//     country: user.country,
//     postalCode: user.postalCode,
//     iban: user.iban,
//     bic: user.bic,
//     oldBankAccountId: user.mangopay.bankAccount,
//   });
//   user.mangopay.bankAccount = bankAccount.Id;
// });

const User = mongoose.model('User', mongoSchema);

module.exports = User;
