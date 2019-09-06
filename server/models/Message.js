const mongoose = require('mongoose');

const User = require('./User');
const CampaignOffer = require('./CampaignOffer');
const Conversation = require('./Conversation');
const { isBusiness, isBrand, isAgency, isInfluencer } = require('../../utils/variables/user');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

/**
 * Check if a user has messaging rights for given offer
 * @param {Object} options
 * @param {Object} options.user - User object to validate
 * @param {Object} options.offer - Offer object to validate against
 */
const checkUserAuthorizedForOffer = ({ user, offer }) => {
  if (
    !(isBrand(user) && offer.campaign.brand.equals(user.brand)) &&
    !(isAgency(user) && user.agency.some((id) => id.equals(offer.campaign.brand))) &&
    !(isInfluencer(user) && offer.user.equals(user._id))
  ) {
    throw new Error('User not authorized for selected offer');
  }
};

/**
 * Check that both recipient and sender are from two valid and different types (influencers vs businesses)
 * @param {Object} options
 * @param {Object} options.userFrom - Sender User object
 * @param {Object} options.userTo - Recipient User object
 */
const checkUsersAreNotSameType = ({ userFrom, userTo }) => {
  if (
    !(isBusiness(userFrom) && isInfluencer(userTo)) &&
    !(isInfluencer(userFrom) && isBusiness(userTo))
  ) {
    throw new Error('You cannot send a message to someone with a role similar to yours');
  }
};

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

  /**
   * Send a message
   * @param {Object} options
   * @param {Object} options.userFrom - Sender User object
   * @param {ObjectId} options.offerId - Offer ID
   * @param {ObjectId} options.toId - Recipient ID
   * @param {String} options.message - Message to send
   */
  static async sendMessage({ userFrom, offerId, toId, message }) {
    let conversationId;
    // Get Conversation Id
    if (isBusiness(userFrom)) {
      const { conversation } = await Conversation.getOrAdd({
        business: userFrom._id,
        influencer: toId,
        offer: offerId,
      });
      conversationId = conversation._id;
    } else {
      const { conversation } = await Conversation.getOrAdd({
        business: toId,
        influencer: userFrom._id,
        offer: offerId,
      });
      conversationId = conversation._id;
    }

    const created = await this.create({
      from: userFrom._id,
      to: toId,
      conversation: conversationId,
      message,
    });
    return created.toObject();
  }

  /**
   * @param {Object} options
   * @param {ObjectId} options.from
   * @param {ObjectId} options.offer
   * @param {String} options.message
   * @param {ObjectId} [options.to]
   */
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

    checkUserAuthorizedForOffer({ user: userFrom, offer });

    // Check Recipient if one is specified
    if (to) {
      const userTo = await User.findById(to)
        .select(['_id', 'role', 'brand', 'agency'])
        .lean();

      if (!userTo) {
        throw new Error('Recipient User not found');
      }

      checkUserAuthorizedForOffer({ user: userTo, offer });
      checkUsersAreNotSameType({ userFrom, userTo });
    }

    let toId;

    // Get Recipient Id
    if (isBusiness(userFrom)) {
      toId = to || offer.user;
    } else {
      toId = to;
      if (!toId) {
        const userTo = await User.findOne({ brand: offer.campaign.brand }).select(['_id', 'brand']);
        if (!userTo) {
          throw new Error('Recipient User not found');
        }
        toId = userTo._id;
      }
    }

    return { message: await this.sendMessage({ userFrom, offerId, toId, message }) };
  }

  /**
   * @param {Object} options
   * @param {ObjectId} options.from
   * @param {ObjectId} options.offer
   * @param {String} options.message
   * @param {Array<ObjectId>} options.to
   */
  static async groupAddForOffer({ from, offer: offerId, message, to }) {
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

    checkUserAuthorizedForOffer({ user: userFrom, offer });

    // Check Recipients
    {
      const usersTo = await User.find({ _id: { $in: to } })
        .select(['_id', 'role', 'brand', 'agency'])
        .lean();

      if (usersTo.length !== to.length) {
        throw new Error('Recipient User not found');
      }

      usersTo.forEach((userTo) => {
        checkUserAuthorizedForOffer({ user: userTo, offer });
        checkUsersAreNotSameType({ userFrom, userTo });
      });
    }

    const messages = await Promise.all(
      to.map((toId) => this.sendMessage({ userFrom, offerId, toId, message })),
    );
    return { messages };
  }
}
mongoSchema.loadClass(MessageClass);

const Message = mongoose.model('Message', mongoSchema);

module.exports = Message;
