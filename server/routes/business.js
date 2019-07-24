const express = require('express');

const Brand = require('../models/Brand');
const User = require('../models/User');
const CampaignOffer = require('../models/CampaignOffer');
const Campaign = require('../models/Campaign');
const { isBusiness, isBrand, isAgency } = require('../../utils/variables/user');
const { handleErrors, listCollection } = require('../utils/express');
const { AwaitingFunding, Validated } = require('../../utils/variables/campaignoffer');

const router = express.Router();

const userOwnsCampaignOffer = handleErrors(async (req, res, next) => {
  const { slug: offer } = req.params;
  const { slug: user } = req.user;
  const owns = await Campaign.ownedByOfferSlug({ offer, user });
  if (!owns) {
    return res.status(404).end();
  }
  next();
});

router.use((req, res, next) => {
  if (!req.user || !isBusiness(req.user)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

router.get(
  '/brands',
  handleErrors(async (req, res) => {
    const { slug } = req.user;
    const { user } = await User.getBySlug({ slug });
    let brands = [];
    if (isBrand(user)) {
      brands = [user.brand];
    } else if (isAgency(user)) {
      brands = user.agency;
    }
    res.json({ brands });
  }),
);

router.get(
  '/brands/:slug',
  handleErrors(async (req, res) => {
    const { slug: brandSlug } = req.params;
    const { slug: userSlug } = req.user;
    const { brand } = await User.getBrandBySlug({ user: userSlug, brand: brandSlug });
    if (brand === null) {
      return res.status(404).end();
    }
    res.json({ brand });
  }),
);

router.put(
  '/brands/:slug',
  handleErrors(async (req, res) => {
    const { slug: brandSlug } = req.params;
    const { slug: userSlug } = req.user;
    const { name, contact, picture, description } = req.body;
    const { brand: old } = await User.getBrandBySlug({ user: userSlug, brand: brandSlug });
    if (old === null) {
      return res.status(404).end();
    }
    const brand = await Brand.updateById({ name, contact, picture, description, brandId: old._id });
    res.json(brand);
  }),
);

router.get('/campaigns', (req, res) =>
  listCollection((listingOptions) => {
    const { _id: userId } = req.user;

    return Campaign.listForUserById({ userId }, listingOptions);
  })(req, res),
);

router.put(
  '/campaigns/:slug',
  handleErrors(async (req, res) => {
    const { slug: campaignSlug } = req.params;
    const { slug: userSlug } = req.user;
    const {
      title,
      description,
      budget,
      video,
      pictures,
      audienceGender,
      audienceAge,
      audienceLanguage,
      audienceCountry,
      location,
      paymentExecution,
    } = req.body;
    const owned = await Campaign.ownedBySlug({
      user: userSlug,
      campaign: campaignSlug,
    });
    if (!owned) {
      return res.status(404).end();
    }
    const campaign = await Campaign.updateBySlug({
      title,
      description,
      budget,
      video,
      pictures,
      audienceGender,
      audienceAge,
      audienceLanguage,
      audienceCountry,
      location,
      paymentExecution,
      slug: campaignSlug,
    });
    res.json(campaign);
  }),
);

router.get(
  '/campaignoffers/:slug',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug: offerSlug } = req.params;
    const offer = await CampaignOffer.getBySlug({ slug: offerSlug });
    res.json(offer);
  }),
);

router.get(
  '/campaignoffers/:slug/stats',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const stats = await CampaignOffer.getStatsBySlug({ slug });
    res.json(stats);
  }),
);

router.get(
  '/campaignoffers/:slug/funds',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const funds = await CampaignOffer.getFundsBySlug({ slug });
    res.json(funds);
  }),
);

router.get(
  '/campaignoffers/:slug/accept',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug: offerSlug } = req.params;
    const offer = await CampaignOffer.changeStatusBySlug({
      slug: offerSlug,
      status: AwaitingFunding,
    });
    res.json(offer);
  }),
);

router.put(
  '/campaignoffers/:slug/validate',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    await CampaignOffer.freeFundsBySlug({ slug });
    res.status(204).end();
  }),
);

router.post(
  '/campaignoffers/:slug/fund-card',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug: offer } = req.params;
    const { slug: user } = req.user;
    const { card } = req.body;
    await CampaignOffer.fundWithCardBySlug({ offer, user, card });
    res.status(204).end();
  }),
);

router.post(
  '/campaignoffers/:slug/fund-wire',
  userOwnsCampaignOffer,
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const payin = await CampaignOffer.fundWithBankWireBySlug({ slug });
    res.json(payin);
  }),
);

/* TODO: AGENCY-ONLY ROUTES: Creating new Brand, Deleting Brand */

module.exports = router;
