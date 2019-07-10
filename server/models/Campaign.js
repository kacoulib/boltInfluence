const mongoose = require('mongoose');

const CampaignOffer = require('./CampaignOffer');
const User = require('./User');
const { languageList } = require('../../utils/variables/general');

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
  // A revoir les produits
  send_product: {
    type: Boolean,
    default: false,
  },
  choose_product: {
    type: Boolean,
    default: false,
  },
  number_of_products_to_send: {
    type: Number,
    default: 0,
  },
  pictures: [String],
  audience_gender: {
    type: String,
    // enum: GenderList,
    required: true,
  },
  audience_age: {
    type: Number,
    required: true,
    // min: 18
  },
  audience_language: [
    {
      type: String,
      enum: languageList,
      required: true,
    },
  ],
  audience_country: [
    {
      type: String,
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
  // offers: [{ type: ObjectId, ref: 'CampaignOffer' }],
});

class CampaignClass {
  static async list({ offset = 0, limit = 10 } = {}) {
    const campaigns = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('brand');
    // .select({ offers: 0 });
    return { campaigns };
  }

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
    return campaign;
  }
}
mongoSchema.loadClass(CampaignClass);

const Campaign = mongoose.model('Campaign', mongoSchema);

module.exports = Campaign;
