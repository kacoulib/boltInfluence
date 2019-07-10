const express = require('express');
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Brand = require('../models/Brand');
// const logger = require('../logs');
const { isAdmin } = require('../../utils/variables/user');

const router = express.Router();

router.use((req, res, next) => {
  // if (!req.user || !isAdmin(req.user)) {
  //   res.status(401).json({ error: 'Unauthorized' });
  //   return;
  // }

  next();
});

router.get('/influencers', async (req, res) => {
  try {
    const influencers = await User.listInfluencers();
    res.json({ influencers });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/businesses', async (req, res) => {
  try {
    const businesses = await User.listBusinesses();
    res.json({ businesses });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.list();
    res.json({ campaigns });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/campaigns/:slug', async (req, res) => {
  try {
    const {
      params: { slug },
    } = req;
    const campaign = await Campaign.getBySlug(slug);
    res.json({ campaign });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.list();
    res.json({ brands });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
