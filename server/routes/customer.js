const express = require('express');

const Campaign = require('../models/Campaign');
const User = require('../models/User');
const { handleErrors, listCollection } = require('../utils/express');

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

router.get('/campaigns', listCollection(Campaign.list.bind(Campaign, {})));

router.get(
  '/campaigns/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const campaign = await Campaign.getBySlug({ slug });
    res.json(campaign);
  }),
);

// List of API:
// 1. /buy-book
// 2. /my-books

module.exports = router;
