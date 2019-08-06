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

  router.get('/notre-methode/blog', handleErrors(async (req, res) => {
    const articles = await Article.list.bind(Article)()
    const categories = await Category.list.bind(Category)()

    nextApp.render(req, res, '/notre-methode/blog', {
      ...articles,
      ...categories,
    })
  }))

  router.get('/', handleErrors(async (req, res) => {
    const faqs = await FAQ.list.bind(FAQ)()

    nextApp.render(req, res, '/', {
      ...faqs,
    })
  }))

  router.get(
    '/notre-methode/blog/:slug',
    handleErrors(async (req, res) => {
      const { slug } = req.params;
      const article = await Article.getBySlug({ slug });

      nextApp.render(req, res, '/notre-methode/blog/single', {
        ...article,
      })
    }),
  )
  router.get('/posts', async (req, res) => {
    return nextApp.render(req, res, '/admin/posts', {
      articles: await Article.count(),
      categories: await Category.count(),
      tags: await Tag.count(),
      faqs: await FAQ.count(),
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
