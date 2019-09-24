const mongoose = require('mongoose');

const CampaignOffer = require('./CampaignOffer');
const User = require('./User');
const { languageCodeList, civilityList } = require('../../utils/variables/general');
const { PaymentExecutionList } = require('../../utils/variables/payment');
const { isInfluencer, isBrand, isAgency, StatusList, Active } = require('../../utils/variables/user');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  brand: {
    type: ObjectId,
    ref: 'Brand',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  video: {
    type: String,
    // required: true
  },
  pictures: [String],
  audienceGender: {
    type: String,
    enum: civilityList.map((c) => c.value),
    required: true,
  },
  audienceAge: {
    type: Number,
    required: true,
    // min: 18
  },
  audienceLanguage: [
    {
      type: String,
      enum: languageCodeList,
      required: true,
    },
  ],
  audienceCountry: [
    {
      type: String,
      // enum: countryList,
      // required: true
    },
  ],
  // social_medias: {
  //   google: CampaignSocialMediaDetails,
  //   instagram: CampaignSocialMediaDetails,
  //   // Other Social Medias
  // },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  paymentExecution: {
    type: String,
    enum: PaymentExecutionList,
    required: true,
  },
  status: {
    type: String,
    enum: StatusList,
    required: true,
  },
  // offers: [{ type: ObjectId, ref: 'CampaignOffer' }],
});

class CampaignClass {
  /**
   * List a limited amount of Campaigns
   * @param {Object} where - Filtering criterias
   * @param {Object} options
   * @param {Number} options.offset - Amount of Campaigns to skip
   * @param {Number} options.limit - Amount of Campaigns to return
   */
  static async list({ where, offset = 0, limit = 10 } = {}) {
    const campaigns = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('brand');
    // .select({ offers: 0 });
    return { campaigns };
  }

  static async listForUserById({ userId }, listingOptions) {
    const user = await User.findById(userId).select(['role', 'brand', 'agency']);
    let where;

    if (isBrand(user)) {
      where = { brand: user.brand };
    } else if (isAgency(user)) {
      where = { brand: { $in: user.agency } };
    }
    if (!where) {
      return { campaigns: [] };
    }
    return this.list(where, listingOptions);
  }

  /**
   * Get a Campaign by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the Campaign to get
   * @param {Boolean=} [params.showOffers]
   */
  static async getBySlug({ slug, showOffers = true } = {}) {
    const campaignDoc = await this.findOne({ slug }).populate('brand');
    if (!campaignDoc) {
      throw new Error('Campaign not found');
    }
    const campaign = campaignDoc.toObject();
    if (showOffers) {
      const offerDocs = await CampaignOffer.find({ campaign: campaign._id }).populate(
        'user',
        User.publicFields(),
      );
      campaign.offers = offerDocs.map((doc) => doc.toObject());
    }
    return { campaign };
  }

  static async getOffersBySlug({ slug }) {
    const campaignDoc = await this.findOne({ slug }).select('_id');
    if (!campaignDoc) {
      throw new Error('Campaign not found');
    }
    const offerDocs = await CampaignOffer.find({ campaign: campaignDoc._id });
    const offers = offerDocs.map((doc) => doc.toObject());
    return { offers };
  }

  static async add({
    brand,
    title,
    description,
    budget,
    video,
    pictures,
    audienceGender,
    audienceAge,
    audienceLanguage,
    audienceCountry,
    location,
    paymentExecution,
  }) {
    const slug = await generateSlug(this, title);
    const status = Active; // Change to Enum Value

    const campaign = await this.create({
      brand,
      title,
      slug,
      description,
      budget,
      video,
      pictures,
      audienceGender,
      audienceAge,
      audienceLanguage,
      audienceCountry,
      location,
      paymentExecution,
      status
    });
    return { campaign };
  }

  /**
   *
   * @param {Object} options
   * @param {String} options.campaign - Campaign slug
   * @param {String} options.user - User slug
   */
  static async addOfferBySlug({ campaign: campaignSlug, user: userSlug }) {
    const { campaign } = await this.getBySlug({ slug: campaignSlug });
    const { user } = await User.getBySlug({ slug: userSlug });
    if (!isInfluencer(user)) {
      throw new Error('User is not an influencer');
    }
    const offer = await CampaignOffer.add({ campaign, user });

    return offer;
  }

  /**
   * Update a Campaign by its slug
   * @param {Object} options
   * @param {String} options.slug - The slug of the Campaign to update
   * @param {String} [options.title]
   * @param {String} [options.description]
   * @param {Number} [options.budget]
   * @param {String} [options.video]
   * @param {Array<String>} [options.pictures]
   * @param {String} [options.audienceGender]
   * @param {Number} [options.audienceAge]
   * @param {String} [options.audienceLanguage]
   * @param {String} [options.audienceCountry]
   * @param {Object} [options.location]
   * @param {Number} options.location.latitude
   * @param {Number} options.location.longitude
   * @param {Number} options.location.radius
   * @param {String} [options.paymentExecution]
   */
  static async updateBySlug({ slug, ...updates }) {
    const campaignDoc = await this.findOne({ slug });
    if (!campaignDoc) {
      throw new Error('Campaign not found');
    }
    Object.entries(updates)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        campaignDoc[key] = value;
      });
    await campaignDoc.save();
    const campaign = campaignDoc.toObject();
    return { campaign };
  }

  static async ownedBySlug({ user: userSlug, campaign: campaignSlug }) {
    const campaign = await this.findOne({ slug: campaignSlug })
      .select(['brand'])
      .lean();

    if (!campaign) {
      return false;
    }
    return User.hasBrandById({ brandId: campaign.brand, user: userSlug });
  }

  static async ownedByOfferSlug({ user: userSlug, offer: offerSlug }) {
    const offer = await CampaignOffer.findOne({ slug: offerSlug })
      .populate('campaign')
      .select(['campaign.brand', 'campaign.user'])
      .lean();

    if (!offer || !offer.campaign) {
      return false;
    }
    return User.hasBrandById({ brandId: offer.campaign.brand, user: userSlug });
  }
}
mongoSchema.loadClass(CampaignClass);

const Campaign = mongoose.model('Campaign', mongoSchema);

module.exports = Campaign;
