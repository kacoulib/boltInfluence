const mongoose = require('mongoose');

const CampaignOffer = require('./CampaignOffer');
const User = require('./User');
const { languageCodeList, civilityList } = require('../../utils/variables/general');
const { PaymentExecutionList } = require('../../utils/variables/payment');
const { isInfluencer } = require('../../utils/variables/user');
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
    type: {
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
    required: true,
  },
  paymentExecution: {
    type: String,
    enum: PaymentExecutionList,
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
  static async list({ offset = 0, limit = 10 } = {}) {
    const campaigns = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('brand');
    // .select({ offers: 0 });
    return { campaigns };
  }

  /**
   * Get a Campaign by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the Campaign to get
   */
  static async getBySlug({ slug }) {
    const campaignDoc = await this.findOne({ slug }).populate('brand');
    if (!campaignDoc) {
      throw new Error('Campaign not found');
    }
    const campaign = campaignDoc.toObject();
    const offerDocs = await CampaignOffer.find({ campaign: campaign._id }).populate(
      'user',
      User.publicFields(),
    );
    campaign.offers = offerDocs.map((doc) => doc.toObject());
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
}
mongoSchema.loadClass(CampaignClass);

const Campaign = mongoose.model('Campaign', mongoSchema);

module.exports = Campaign;
