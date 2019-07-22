const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    // required: true,
  },
  accessTokenSecret: {
    type: String,
    // required: true,
  },
  tokenType: {
    type: String,
    // required: true,
  },
  expiryDate: {
    type: Number,
  },
});

mongoSchema.index({ user: 1, provider: 1 }, { unique: true });
mongoSchema.index({ provider: 1, identifier: 1 }, { unique: true });

class SocialMediaTokenClass {}
mongoSchema.loadClass(SocialMediaTokenClass);

const SocialMediaToken = mongoose.model('SocialMediaToken', mongoSchema);

module.exports = SocialMediaToken;
