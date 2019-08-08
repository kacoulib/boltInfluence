const express = require('express');

const Campaign = require('../models/Campaign');
const CampaignOffer = require('../models/CampaignOffer');
const { handleErrors, listCollection } = require('../utils/express');
const { isInfluencer } = require('../../utils/variables/user');
const { AwaitingValidation } = require('../../utils/variables/campaignoffer');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user || !isInfluencer(req.user)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

router.get('/campaignoffers', (req, res) =>
  listCollection((listingOptions) => {
    const { _id: user } = req.user;

    return CampaignOffer.listForInfluencerById({ user }, listingOptions);
  })(req, res),
);

router.post(
  '/campaignoffers',
  handleErrors(async (req, res) => {
    const { campaign } = req.body;
    const { slug: user } = req.user;
    const offer = await Campaign.addOfferBySlug({ campaign, user });
    res.json(offer);
  }),
);

router.get(
  '/campaignoffers/:slug',
  handleErrors(async (req, res) => {
    const { slug: offerSlug } = req.params;
    const { _id: userId } = req.user;
    const own = await CampaignOffer.ownedByUserId({ userId, offer: offerSlug });
    if (!own) {
      return res.status(404).end();
    }
    const offer = await CampaignOffer.getBySlug({ slug: offerSlug });
    res.json(offer);
  }),
);

router.put(
  '/campaignoffers/:slug/finish',
  handleErrors(async (req, res) => {
    const { slug: offerSlug } = req.params;
    const { _id: userId } = req.user;
    const own = await CampaignOffer.ownedByUserId({ userId, offer: offerSlug });
    if (!own) {
      return res.status(404).end();
    }
    const offer = await CampaignOffer.changeStatusBySlug({
      slug: offerSlug,
      status: AwaitingValidation,
    });
    res.json(offer);
  }),
);

module.exports = router;
