const mongoose = require('mongoose');

const User = require('./User');
const Message = require('./Message');
const UserConversation = require('./UserConversation');
const { isBusiness, isInfluencer } = require('../../utils/variables/user');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
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
});
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

  static async addForOffer({ from, offer, message: content, to }) {
    const { message } = await Message.addForOffer({ from, offer, message: content, to });
    const users = [message.from, message.to];
    await UserConversation.addIfNonexistentForManyUsersById({
      users,
      conversation: message.conversation,
    });
    // await this.insertMany(users.map((user) => ({ user, message })), {
    //   ordered: false,
    // });
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
    return { message: userMessage };
  }
}

mongoSchema.loadClass(UserMessageClass);

const UserMessage = mongoose.model('UserMessage', mongoSchema);

module.exports = UserMessage;
