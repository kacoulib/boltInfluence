const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  campaign: {
    type: ObjectId,
    ref: 'Campaign',
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    // enum: CampaignOfferStatuses,
    required: true,
  },
});

class CampaignOfferClass {}
mongoSchema.loadClass(CampaignOfferClass);

const CampaignOffer = mongoose.model('CampaignOffer', mongoSchema);

module.exports = CampaignOffer;
