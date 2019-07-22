const express = require('express');
const multer = require('multer');

const User = require('../models/User');
const Campaign = require('../models/Campaign');
const CampaignOffer = require('../models/CampaignOffer');
const Brand = require('../models/Brand');
const logger = require('../logs');
const { isAdmin } = require('../../utils/variables/user');
const { registerCard } = require('../utils/mangopay');
const { handleErrors, listCollection } = require('../utils/express');

const router = express.Router();
const kycUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fields: 0,
    fileSize: 7e6, // 7 MB
    files: 1,
  },
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
  '/users/:slug/preregister-card',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const { cardType, currency } = req.body;
    const registration = await User.preregisterCardBySlug({ slug, cardType, currency });
    res.json(registration);
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

router.get('/campaignoffers', listCollection(CampaignOffer.list.bind(CampaignOffer, {})));

router.post(
  '/campaignoffers',
  handleErrors(async (req, res) => {
    const { campaign, user } = req.body;
    const offer = await Campaign.addOfferBySlug({ user, campaign });
    res.json(offer);
  }),
);

router.get(
  '/campaignoffers/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const offer = await CampaignOffer.getBySlug({ slug });
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

router.get(
  '/campaignoffers/:slug/funds',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const funds = await CampaignOffer.getFundsBySlug({ slug });
    res.json(funds);
  }),
);

router.post(
  '/campaignoffers/:slug/fund-card',
  handleErrors(async (req, res) => {
    const { slug: offer } = req.params;
    const { user, card } = req.body;
    await CampaignOffer.fundWithCardBySlug({ offer, user, card });
    res.status(204).end();
  }),
);

router.post(
  '/campaignoffers/:slug/fund-wire',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const payin = await CampaignOffer.fundWithBankWireBySlug({ slug });
    res.json(payin);
  }),
);

router.post(
  '/campaignoffers/:slug/validate',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    await CampaignOffer.freeFundsBySlug({ slug });
    res.status(204).end();
  }),
);

router.get('/brands', listCollection(Brand.list.bind(Brand)));

router.post(
  '/cards/preregister',
  handleErrors(async (req, res) => {
    const { user, cardType, currency } = req.body;
    const registration = await User.preregisterCardBySlug({ slug: user, cardType, currency });
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

module.exports = router;

/* TODO: Add input validation to routes */
/* TODO Front:
To register a card, you have to post, as url-encoded, these data:
- accessKeyRef: The accessKey for the registration
- data: The preregistrationData
- cardNumber: The card number
- cardExpirationDate: The card expiration date in MMYY format
- cardCvx: The 3 numbers behind the card
*/
