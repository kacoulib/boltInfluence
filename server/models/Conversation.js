const mongoose = require('mongoose');

const User = require('./User');
const { isBusiness, isInfluencer } = require('../../utils/variables/user');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  influencer: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  business: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  offer: {
    type: ObjectId,
    ref: 'CampaignOffer',
    required: true,
  },
  businessFavorite: {
    type: Boolean,
    default: false,
  },
  influencerFavorite: {
    type: Boolean,
    default: false,
  },
});
mongoSchema.index({ influencer: 1, business: 1, offer: 1 }, { unique: true });

class ConversationClass {
  static async list(where, { offset = 0, limit = 10 } = {}) {
    const conversations = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('influencer', User.publicFields())
      .populate('business', User.publicFields())
      .populate({ path: 'offer', populate: { path: 'campaign', populate: { path: 'brand' } } });
    return { conversations };
  }

  /**
   * Find or create a conversation given criterias.
   * @param {Object} options
   * @param {ObjectId} options.offer
   * @param {ObjectId} [options.influencer]
   * @param {ObjectId} [options.business]
   */
  static async getOrAdd({ influencer, business, offer }) {
    const found = await this.findOne({ influencer, business, offer });
    if (found) {
      return { conversation: found };
    }
    const created = await this.create({ influencer, business, offer });
    return { conversation: created };
  }

  /**
   * Update whether a conversation is favorited by a user.
   * Returns null if the conversation is not found or if the user cannot access it.
   * @param {Object} options
   * @param {ObjectId} options.user
   * @param {ObjectId} options.conversation
   * @param {Boolean} options.favorite
   */
  static async updateById({ user: userId, conversation: conversationId, favorite }) {
    const user = await User.findById(userId)
      .select(['_id', 'role'])
      .lean();
    if (!user) {
      throw new Error('User not found');
    }
    const conversation = await this.findById(conversationId);
    if (
      !conversation ||
      (!(isBusiness(user) && conversation.business.equals(user._id)) &&
        !(isInfluencer(user) && conversation.influencer.equals(user._id)))
    ) {
      return { conversation: null };
    }
    if (favorite !== undefined) {
      if (isInfluencer(user)) {
        conversation.influencerFavorite = favorite;
      } else {
        conversation.businessFavorite = favorite;
      }
      await conversation.save();
    }
    return { conversation: conversation.toObject() };
  }
}
mongoSchema.loadClass(ConversationClass);

const Conversation = mongoose.model('Conversation', mongoSchema);

module.exports = Conversation;
