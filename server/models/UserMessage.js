const mongoose = require('mongoose');

const User = require('./User');
const Message = require('./Message');
const UserConversation = require('./UserConversation');
const { isBusiness, isInfluencer } = require('../../utils/variables/user');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: ObjectId,
      ref: 'Message',
      required: true,
    },
    conversation: {
      type: ObjectId,
      ref: 'Conversation',
      required: true,
    },
    // Additional user-specific infos about a message
  },
  { timestamps: true },
);
mongoSchema.index({ user: 1, message: 1 }, { unique: true });

class UserMessageClass {
  static async list(where, { offset = 0, limit = 10 } = {}) {
    const messages = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate({ path: 'message' })
      .lean();
    return { messages };
  }

  static async getById({ user, message: messageId }) {
    const message = await this.findOne({ user, message: messageId })
      .populate('message')
      .lean();
    return { message };
  }

  static async messageToUserMessage(message) {
    await UserConversation.addIfNonexistentForManyUsersById({
      users: [message.from, message.to],
      conversation: message.conversation,
    });
    await this.create({
      user: message.to,
      message: message._id,
      conversation: message.conversation,
    });
    const userMessage = await this.create({
      user: message.from,
      message: message._id,
      conversation: message.conversation,
    });
    return { ...userMessage.toObject(), message };
  }

  /**
   * @param {Object} options
   * @param {ObjectId} options.from
   * @param {ObjectId} options.offer
   * @param {String} options.message
   * @param {ObjectId} [options.to]
   */
  static async addForOffer({ from, offer, message: content, to }) {
    const { message } = await Message.addForOffer({ from, offer, message: content, to });
    const userMessage = await this.messageToUserMessage(message);
    return { message: userMessage };
  }

  /**
   * @param {Object} options
   * @param {ObjectId} options.from
   * @param {ObjectId} options.offer
   * @param {String} options.message
   * @param {Array<ObjectId>} options.to
   */
  static async groupAddForOffer({ from, offer, message: content, to }) {
    const { messages } = await Message.groupAddForOffer({ from, offer, message: content, to });
    const userMessages = await Promise.all(
      messages.map((message) => this.messageToUserMessage(message)),
    );
    return { messages: userMessages };
  }

  static async deleteById({ user, message }) {
    await this.deleteOne({ user, message });
  }

  static async deleteManyById({ user, messages }) {
    await this.deleteMany({ user, message: { $in: messages } });
  }

  static async deleteAllForConversationById({ user, conversation }) {
    await this.deleteMany({ user, conversation });
  }

  static async deleteAllForManyConversationsById({ user, conversations }) {
    await this.deleteMany({ user, conversation: { $in: conversations } });
  }
}

mongoSchema.loadClass(UserMessageClass);

const UserMessage = mongoose.model('UserMessage', mongoSchema);

module.exports = UserMessage;
