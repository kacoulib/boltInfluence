const mongoose = require('mongoose');

const User = require('./User');
const CampaignOffer = require('./CampaignOffer');
const Conversation = require('./Conversation');
const { isBusiness, isBrand, isAgency, isInfluencer } = require('../../utils/variables/user');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  from: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  conversation: {
    type: ObjectId,
    ref: 'Conversation',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

class MessageClass {
  static async list(where, { offset = 0, limit = 10 } = {}) {
    const messages = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return { messages };
  }

  static async add({ from, to, conversation, message }) {
    const created = await this.create({
      from,
      to,
      conversation,
      message,
    });
    return { message: created };
  }

  static async addForOffer({ from, offer: offerId, message, to }) {
    const offer = await CampaignOffer.findById(offerId)
      .select(['_id', 'campaign', 'user'])
      .populate({ path: 'campaign', select: 'brand' })
      .lean();

    if (!offer) {
      throw new Error('CampaignOffer not found');
    }

    const userFrom = await User.findById(from)
      .select(['_id', 'brand', 'agency', 'role'])
      .lean();

    // Check Sender
    if (!userFrom) {
      throw new Error('Sender User not found');
    }

    if (
      !(isBrand(userFrom) && offer.campaign.brand.equals(userFrom.brand)) &&
      !(isAgency(userFrom) && userFrom.agency.some((id) => id.equals(offer.campaign.brand))) &&
      !(isInfluencer(userFrom) && offer.user.equals(userFrom._id))
    ) {
      throw new Error('You are not authorized to do this');
    }

    // Check Recipient if one is specified
    if (to) {
      const userTo = await User.findById(to)
        .select(['_id', 'role', 'brand', 'agency'])
        .lean();

      if (!userTo) {
        throw new Error('Recipient User not found');
      }

      if (
        !(isBrand(userTo) && offer.campaign.brand === userTo.brand) &&
        !(isAgency(userTo) && userTo.agency.some((id) => id.equals(offer.campaign.brand))) &&
        !(isInfluencer(userTo) && offer.user.equals(userTo._id))
      ) {
        throw new Error('Invalid recipient');
      }

      if (
        !(isBusiness(userFrom) && isInfluencer(userTo)) &&
        !(isInfluencer(userFrom) && isBusiness(userTo))
      ) {
        throw new Error('You cannot send a message to someone with a role similar to yours');
      }
    }

    let toId;
    let conversationId;

    // Get Conversation Id and Recipient Id
    if (isBusiness(userFrom)) {
      toId = to || offer.user;
      const { conversation } = await Conversation.getOrAdd({
        business: from,
        influencer: toId,
        offer: offerId,
      });
      conversationId = conversation._id;
    } else {
      toId = to;
      if (!toId) {
        const userTo = await User.findOne({ brand: offer.campaign.brand }).select(['_id', 'brand']);
        if (!userTo) {
          throw new Error('Recipient User not found');
        }
        toId = userTo._id;
      }
      const { conversation } = await Conversation.getOrAdd({
        business: toId,
        influencer: from,
        offer: offerId,
      });
      conversationId = conversation._id;
    }

    const created = await this.create({
      from,
      to: toId,
      conversation: conversationId,
      message,
    });
    return { message: created };
  }
}
mongoSchema.loadClass(MessageClass);

const Message = mongoose.model('Message', mongoSchema);

module.exports = Message;
