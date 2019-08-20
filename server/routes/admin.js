const express = require('express');
const multer = require('multer');

const CenterOfInterest = require('../models/CenterOfInterest');
const Article = require('../models/Article');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const FAQ = require('../models/FAQ');
const EmailTemplate = require('../models/EmailTemplate');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const CampaignOffer = require('../models/CampaignOffer');
const Brand = require('../models/Brand');
const logger = require('../logs');
const { isAdmin } = require('../../utils/variables/user');
const { registerCard } = require('../utils/mangopay');
const { kycFileUpload } = require('../utils/multer');
const { handleErrors, listCollection, verifyKycParams } = require('../utils/express');

const router = express.Router();

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

router.get('/user/:slug/payments', (req, res) =>
  listCollection((listingOptions) => {
    const { slug: user } = req.params;

    return Payment.listForUserBySlug({ user }, listingOptions);
  })(req, res),
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
  kycFileUpload,
  verifyKycParams(User.addIdentityProofBySlug.bind(User)),
);

router.post(
  '/users/:slug/kyc-registration',
  kycFileUpload,
  verifyKycParams(User.addRegistrationProofBySlug.bind(User)),
);

router.post(
  '/users/:slug/kyc-association',
  kycFileUpload,
  verifyKycParams(User.addArticlesOfAssociationBySlug.bind(User)),
);

router.get(
  '/users/:slug/ubos',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const ubos = await User.getUbosBySlug({ slug });
    res.json(ubos);
  }),
);

router.post(
  '/users/:slug/ubos',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const ubos = req.body;
    const newUbos = await User.createOrUpdateUbosBySlug({ slug, ubos });
    res.json(newUbos);
  }),
);

router.put(
  '/users/:slug/ubos',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    await User.submitUboDeclarationBySlug({ slug });
    res.status(204).end();
  }),
);

// router.post(
//   '/users/:slug/ubo',
//   handleErrors(async (req, res) => {
//     const { slug } = req.params;
//     const options = req.body;
//     await User.createOrUpdateUboBySlug({ ...options, slug });
//     res.status(204).end();
//   }),
// );

// router.put(
//   '/users/:slug/ubo',
//   handleErrors(async (req, res) => {
//     const { slug } = req.params;
//     await User.submitUboDeclarationBySlug({ slug });
//     res.status(204).end();
//   }),
// );

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

router.get('/payments', listCollection(Payment.list.bind(Payment, {})));

router.get('/emailtemplates', listCollection(EmailTemplate.list.bind(EmailTemplate)));

router.get(
  '/emailtemplates/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const template = await EmailTemplate.getBySlug({ slug });
    return res.json(template);
  }),
);
router.post(
  '/emailtemplate',
  handleErrors(async (req, res) => {
    const { name, subject, message } = req.body;
    const emailTemplate = await EmailTemplate.add({ name, subject, message });
    res.json(emailTemplate);
  }),
);

router.get('/articles', listCollection(Article.list.bind(Article)));

router.post(
  '/articles',
  handleErrors(async (req, res) => {
    const { firstName, lastName } = req.user;
    const { title, picture, content, tags, categories, social_medias } = req.body;
    const article = await Article.add({ title, picture, content, tags, categories, social_medias, author: `${firstName} ${lastName}` });
    res.json(article);
  }),
);

// Article
router.get(
  '/articles/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const article = await Article.getBySlug({ slug });
    res.json(article);
  }),
);

router.put(
  '/articles/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const { title, picture, content, tags, categories } = req.body;
    const article = await Article.updateBySlug({ title, picture, content, tags, categories, slug });
    res.json(article);
  }),
);

router.delete(
  '/articles/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    await Article.deleteBySlug({ slug });
    res.status(204).end();
  }),
);

// Category
router.get('/categories', listCollection(Category.list.bind(Category)))

router.post(
  '/categories',
  handleErrors(async (req, res) => {
    const { title, color } = req.body;
    const category = await Category.add({ title, color });
    res.json(category);
  }),
)

router.get(
  '/categories/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    const category = await Category.getById({ id });
    res.json(category);
  }),
)

router.put(
  '/categories/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    const { title, color } = req.body;

    const category = await Category.updateById({ title, color, id });
    res.json(category);
  }),
)

router.delete(
  '/categories/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    await Category.deleteByid({ id });
    res.status(204).end();
  }),
)

// Tag
router.get('/tags', listCollection(Tag.list.bind(Tag)))

router.post(
  '/tags',
  handleErrors(async (req, res) => {
    const { title } = req.body;
    const tag = await Tag.add({ title });
    res.json(tag);
  }),
)

router.get(
  '/tags/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    const tag = await Tag.getById({ id });
    res.json(tag);
  }),
)

router.put(
  '/tags/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const tag = await Tag.updateById({ title, id });
    res.json(tag);
  }),
)

router.delete(
  '/tags/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    await Tag.deleteByid({ id });
    res.status(204).end();
  }),
)

// FAQ
router.get('/faqs', listCollection(FAQ.list.bind(FAQ)))

router.post(
  '/faqs',
  handleErrors(async (req, res) => {
    const { title, content } = req.body;
    const faq = await FAQ.add({ title, content });
    res.json(faq);
  }),
)

router.get(
  '/faqs/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    const faq = await FAQ.getById({ id });
    res.json(faq);
  }),
)

router.put(
  '/faqs/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const faq = await FAQ.updateById({ title, content, id });
    res.json(faq);
  }),
)

router.delete(
  '/faqs/:id',
  handleErrors(async (req, res) => {
    const { id } = req.params;
    await FAQ.deleteByid({ id });
    res.status(204).end();
  }),
)

// Center Of Interest
router.get(
  '/centersofinterest',
  handleErrors(async (req, res) => {
    const centersOfInterest = await CenterOfInterest.getAll();
    res.json(centersOfInterest);
  }),
);

router.post(
  '/centersofinterest',
  handleErrors(async (req, res) => {
    const { name } = req.body;
    const centerOfInterest = await CenterOfInterest.add({ name });
    res.json(centerOfInterest);
  }),
);

router.get(
  '/centersofinterest/:name',
  handleErrors(async (req, res) => {
    const { name } = req.params;
    const centerOfInterest = await CenterOfInterest.getByName({ name });
    res.json(centerOfInterest);
  }),
);

router.put(
  '/centersofinterest/:name',
  handleErrors(async (req, res) => {
    const { name: origName } = req.params;
    const { name: newName } = req.body;
    const centerOfInterest = await CenterOfInterest.updateByName({ origName, newName });
    res.json(centerOfInterest)
  }),
)

router.delete(
  '/centersofinterest/:name',
  handleErrors(async (req, res) => {
    const { name } = req.params;
    const centerOfInterest = await CenterOfInterest.deleteByName({ name });
    res.status(204).end();
  }),
)

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
