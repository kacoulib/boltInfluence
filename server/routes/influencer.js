const express = require('express');

const Campaign = require('../models/Campaign');
const CampaignOffer = require('../models/CampaignOffer');
const { handleErrors, listCollection } = require('../utils/express');
const { isInfluencer } = require('../../utils/variables/user');

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

module.exports = router;
