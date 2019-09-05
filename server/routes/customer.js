const express = require('express');

const Payment = require('../models/Payment');
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const FavoriteConversation = require('../models/FavoriteConversation');
const { handleErrors, listCollection, verifyKycUser } = require('../utils/express');
const { kycFileUpload } = require('../utils/multer');
const { registerCard } = require('../utils/mangopay');
const { isBusiness, isInfluencer } = require('../../utils/variables/user');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

router.get('/profile', handleErrors(async (req, res) => res.json({ profile: req.user })));

router.put(
  '/profile',
  handleErrors(async (req, res) => {
    const { slug } = req.user;
    const {
      firstName,
      lastName,
      newsletter,
      notifications,
      address,
      city,
      country,
      postalCode,
      siret,
      companyEmail,
      companyName,
      companySize,
      placeOfBirth,
      dateOfBirth,
    } = req.body;
    const { user } = await User.updateBySlug({
      firstName,
      lastName,
      newsletter,
      notifications,
      address,
      city,
      country,
      postalCode,
      siret,
      companyEmail,
      companyName,
      companySize,
      placeOfBirth,
      dateOfBirth,
      slug,
    });
    res.json({ profile: user });
  }),
);

router.post(
  '/profile/kyc-identity',
  kycFileUpload,
  verifyKycUser(User.addIdentityProofBySlug.bind(User)),
);

router.post(
  '/profile/kyc-registration',
  kycFileUpload,
  verifyKycUser(User.addRegistrationProofBySlug.bind(User)),
);

router.post(
  '/profile/kyc-association',
  kycFileUpload,
  verifyKycUser(User.addArticlesOfAssociationBySlug.bind(User)),
);

router.get('/campaigns', listCollection(Campaign.list.bind(Campaign, {})));

router.get(
  '/campaigns/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const campaign = await Campaign.getBySlug({ slug, showOffers: false });
    res.json(campaign);
  }),
);

router.get('/payments', (req, res) =>
  listCollection((listingOptions) => {
    const { _id: user } = req.user;

    return Payment.listForUserById({ user }, listingOptions);
  })(req, res),
);

router.post(
  '/cards/preregister',
  handleErrors(async (req, res) => {
    const { cardType, currency } = req.body;
    const { slug } = req.user;
    const registration = await User.preregisterCardBySlug({ slug, cardType, currency });
    res.json(registration);
  }),
);

router.post(
  '/cards/register',
  handleErrors(async (req, res) => {
    const { registrationId, registrationData } = req.body;
    await registerCard({ registrationId, registrationData });
    res.status(204).end();
  }),
);

/**
 * Takes an optional "favorite" query param
 * If the field is not undefined, it is used as a boolean to restrict the search
 */
router.get('/conversations', (req, res) =>
  listCollection((listingOptions) => {
    const { _id: user } = req.user;
    const { favorite } = req.query;
    let options;
    let favoriteOptions;

    if (isBusiness(req.user)) {
      options = { business: user };
      favoriteOptions = { businessFavorite: favorite };
    } else if (isInfluencer(req.user)) {
      options = { influencer: user };
      favoriteOptions = { influencerFavorite: favorite };
    } else {
      return { conversations: [] };
    }

    if (favorite !== undefined) {
      options = { ...options, ...favoriteOptions };
    }

    return Conversation.list(options, listingOptions);
  })(req, res),
);

router.get(
  '/conversations/:id',
  handleErrors(async (req, res) => {
    const { _id: user } = req.user;
    const { id: conversationId } = req.params;
    let options;

    if (isBusiness(req.user)) {
      options = { business: user };
    } else if (isInfluencer(req.user)) {
      options = { influencer: user };
    } else {
      return res.status(404).end();
    }

    const conversation = await Conversation.findOne({
      ...options,
      _id: conversationId,
    });
    if (!conversation) {
      return res.status(404).end();
    }
    res.json({ conversation });
  }),
);

router.put(
  '/conversations/:id',
  handleErrors(async (req, res) => {
    const { _id: user } = req.user;
    const { id: conversationId } = req.params;
    const { favorite } = req.body;

    const { conversation } = await Conversation.updateById({
      user,
      conversation: conversationId,
      favorite,
    });
    if (!conversation) {
      return res.status(404).end();
    }
    res.json({ conversation });
  }),
);

router.get('/conversations/:id/messages', (req, res) =>
  listCollection((listingOptions) => {
    const { _id: user } = req.user;
    const { id: conversation } = req.params;

    return Message.list(
      { $and: [{ conversation }, { $or: [{ from: user }, { to: user }] }] },
      listingOptions,
    );
  })(req, res),
);

router.post(
  '/messages',
  handleErrors(async (req, res) => {
    const { _id: from } = req.user;
    const { offer, message: content, to } = req.body;
    const message = await Message.addForOffer({ from, offer, message: content, to });
    res.json(message);
  }),
);

// List of API:
// 1. /buy-book
// 2. /my-books

module.exports = router;
