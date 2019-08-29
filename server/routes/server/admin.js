const express = require('express');
const multer = require('multer');

const Article = require('../../models/Article');
const Category = require('../../models/Category');
const FAQ = require('../../models/FAQ');
const Tag = require('../../models/Tag');
const EmailTemplate = require('../../models/EmailTemplate');
const Payment = require('../../models/Payment');
const User = require('../../models/User');
const Campaign = require('../../models/Campaign');
const CampaignOffer = require('../../models/CampaignOffer');
const Brand = require('../../models/Brand');
const logger = require('../../logs');
const { isAdmin } = require('../../../utils/variables/user');
// const { isAdmin } = require('../../../../utils/variables/user');
const { registerCard } = require('../../utils/mangopay');
const { kycFileUpload } = require('../../utils/multer');
const { handleErrors, listCollection, serverListCollection, verifyKycParams } = require('../../utils/express');

const router = express.Router();


module.exports = (nextApp) => {

  router.use((req, res, next) => {
    if (!req.user || !isAdmin(req.user)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    next();
  });

  // router.get('/posts', ()=>listCollection(User.listInfluencers.bind(User)));
  router.get('/posts', async (req, res) => {
    const categories = await Category.list()
    const tags = await Tag.list()

    return nextApp.render(req, res, '/admin/posts', {
      articlesLength: await Article.count(),
      ...categories,
      ...tags,
      faqsLength: await FAQ.count(),
    })
  });

  return router
}

/* TODO: Add input validation to routes */
/* TODO Front:
To register a card, you have to post, as url-encoded, these data:
- accessKeyRef: The accessKey for the registration
- data: The preregistrationData
- cardNumber: The card number
- cardExpirationDate: The card expiration date in MMYY format
- cardCvx: The 3 numbers behind the card
*/
