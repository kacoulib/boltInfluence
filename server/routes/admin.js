const express = require('express');

const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Brand = require('../models/Brand');
// const logger = require('../logs');
const { isAdmin } = require('../../utils/variables/user');

const router = express.Router();

const listCollection = (listFn) => async (req, res) => {
  try {
    let { offset, limit } = req.query;

    offset = Number(offset) || undefined;
    limit = Number(limit) || undefined;

    res.json(await listFn({ offset, limit }));
  } catch (err) {
    res.json({ error: err.message || err.Message || err.toString() });
  }
};

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

router.get('/users/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const user = await User.getBySlug({ slug });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.put('/users/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;
    const user = await User.updateBySlug({ ...updates, slug });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message || err.Message || err.toString() });
  }
});

router.get('/campaigns', listCollection(Campaign.list.bind(Campaign)));

router.get('/campaigns/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const campaign = await Campaign.getBySlug({ slug });
    res.json(campaign);
  } catch (err) {
    res.json({ error: err.message || err.Message || err.toString() });
  }
});

router.get('/brands', listCollection(Brand.list.bind(Brand)));

module.exports = router;

/* TODO: Add input validation to routes */
