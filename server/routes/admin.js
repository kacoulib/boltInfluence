const express = require('express');
const multer = require('multer');

const User = require('../models/User');
const Campaign = require('../models/Campaign');
const CampaignOffer = require('../models/CampaignOffer');
const Brand = require('../models/Brand');
const logger = require('../logs');
const { isAdmin } = require('../../utils/variables/user');

const router = express.Router();
const kycUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fields: 0,
    fileSize: 7e6, // 7 MB
    files: 1,
  },
});

const handleErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.Message || err.toString() });
  }
};

const listCollection = (listFn) =>
  handleErrors(async (req, res) => {
    let { offset, limit } = req.query;

    offset = Number(offset) || undefined;
    limit = Number(limit) || undefined;

    res.json(await listFn({ offset, limit }));
  });

router.use((req, res, next) => {
  if (!req.user || !isAdmin(req.user)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
});

router.get('/influencers', listCollection(User.listInfluencers.bind(User)));

router.get('/businesses', listCollection(User.listBusinesses.bind(User)));

router.get('/users', listCollection(User.list.bind(User)));

router.get(
  '/users/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const user = await User.getBySlug({ slug });
    res.json(user);
  }),
);

router.put(
  '/users/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const updates = req.body;
    const user = await User.updateBySlug({ ...updates, slug });
    res.json(user);
  }),
);

router.post(
  '/users/:slug/kyc-identity',
  kycUpload.single('document'),
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const file = req.file.buffer.toString('base64');

    await User.addIdentityProofBySlug({ slug, file });
    res.status(204).end();
  }),
);

router.post(
  '/users/:slug/kyc-registration',
  kycUpload.single('document'),
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const file = req.file.buffer.toString('base64');

    await User.addRegistrationProofBySlug({ slug, file });
    res.status(204).end();
  }),
);

router.get('/campaigns', listCollection(Campaign.list.bind(Campaign)));

router.post(
  '/campaigns',
  handleErrors(async (req, res) => {
    const options = req.body; // TODO: Validation
    const campaign = await Campaign.add(options);
    res.json(campaign);
  }),
);

router.get(
  '/campaigns/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const campaign = await Campaign.getBySlug({ slug });
    res.json(campaign);
  }),
);

router.get(
  '/campaigns/:slug/offers',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const offers = await Campaign.getOffersBySlug({ slug });
    res.json(offers);
  }),
);

router.post(
  '/campaigns/:slug/offers',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const { user } = req.body;
    const offer = await Campaign.addOfferBySlug({ user, campaign: slug });
    res.json(offer);
  }),
);

router.post(
  '/campaignoffers',
  handleErrors(async (req, res) => {
    const { campaign, user } = req.body;
    const offer = await Campaign.addOfferBySlug({ user, campaign });
    res.json(offer);
  }),
);

router.put(
  '/campaignoffers/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const { status } = req.body;
    const offer = await CampaignOffer.changeStatusBySlug({ slug, status });
    res.json(offer);
  }),
);

router.get('/brands', listCollection(Brand.list.bind(Brand)));

module.exports = router;

/* TODO: Add input validation to routes */
