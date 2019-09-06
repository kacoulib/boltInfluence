const mongoose = require('mongoose');

const User = require('./User');
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
    conversation: {
      type: ObjectId,
      ref: 'Conversation',
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
mongoSchema.index({ user: 1, conversation: 1 }, { unique: true });

class UserConversationClass {
  static async list(where, { offset = 0, limit = 10 } = {}) {
    const conversations = await this.find(where)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'conversation',
        select: User.publicFields(),
        populate: [
          { path: 'influencer', select: User.publicFields() },
          { path: 'business', select: User.publicFields() },
          { path: 'offer', populate: { path: 'campaign', populate: { path: 'brand' } } },
        ],
      })
      .lean();
    return { conversations };
  }

  static async getById({ user, conversation: conversationId }) {
    const conversation = await this.findOne({ user, conversation: conversationId }).populate(
      'conversation',
    );
    return { conversation };
  }

  static async updateById({ user, conversation, favorite }) {
    const userConversation = await this.findOne({ user, conversation });
    if (!userConversation) {
      return { conversation: null };
    }
    if (favorite !== undefined) {
      userConversation.favorite = favorite;
      await userConversation.save();
    }
    return { conversation: userConversation.toObject() };
  }

  /**
   * Add conversations if they do not exist already for many users.
   * @param {Object} options
   * @param {Array<ObjectId>} options.users
   * @param {ObjectId} options.conversation
   */
  static async addIfNonexistentForManyUsersById({ users, conversation }) {
    const conversations = await Promise.all(
      users.map((user) =>
        this.findOneAndUpdate(
          { user, conversation },
          { user, conversation },
          { upsert: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );
    return { conversations };
  }

  static async deleteById({ user, conversation }) {
    await this.deleteOne({ user, conversation });
  }

  static async deleteManyById({ user, conversations }) {
    await this.deleteMany({ user, conversation: { $in: conversations } });
  }
}

mongoSchema.loadClass(UserConversationClass);

const UserConversation = mongoose.model('UserConversation', mongoSchema);

module.exports = UserConversation;
