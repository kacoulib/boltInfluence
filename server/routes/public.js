const express = require('express');
const escape = require('escape-html');

const EmailTemplate = require('../models/EmailTemplate');
const KycValidation = require('../models/KycValidation');
const Payment = require('../models/Payment');
const PaymentOperation = require('../models/PaymentOperation');
const CampaignOffer = require('../models/CampaignOffer');
const Article = require('../models/Article');
const FAQ = require('../models/FAQ');
const Category = require('../models/Category');
const { isTransferIn, isTransferOut } = require('../../utils/variables/paymentoperation');
const { handleErrors, listCollection } = require('../utils/express');
const { sendMail } = require('../utils/nodemailer');
const logger = require('../logs');
// const Book = require('../models/Book');
// const Chapter = require('../models/Chapter');

const router = express.Router();

const mangopayWebhook = (type, fn) => async (req, res) => {
  let EventType;
  let RessourceId;

  try {
    EventType = req.query.EventType;
    RessourceId = req.query.RessourceId;

    if (EventType !== type || !RessourceId) {
      return res.status(400).end();
    }

    res.status(200).end();
  } catch (err) {
    logger.error(err);
    return res.json({ error: err.message || err.toString() });
  }

  try {
    await fn({ EventType, RessourceId });
    // TODO: Send mail to user
  } catch (err) {
    logger.error(err);
    // TODO: Log somewhere? Mail?
  }
};

router.get(
  '/webhooks/mangopay/payin-normal-succeeded',
  mangopayWebhook('PAYIN_NORMAL_SUCCEEDED', async ({ RessourceId }) => {
    logger.info(`PayIn succeeded for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.succeedById({
      operationId: RessourceId,
    });
    await Payment.transferInById({ paymentId: paymentOperation.payment._id });
  }),
);

router.get(
  '/webhooks/mangopay/payin-normal-failed',
  mangopayWebhook('PAYIN_NORMAL_FAILED', async ({ RessourceId }) => {
    logger.error(`PayIn failed for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.failById({ operationId: RessourceId });
    await Payment.failById({ paymentId: paymentOperation.payment._id });
  }),
);

router.get(
  '/webhooks/mangopay/payout-normal-succeeded',
  mangopayWebhook('PAYOUT_NORMAL_SUCCEEDED', async ({ RessourceId }) => {
    logger.info(`PayOut succeeded for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.succeedById({
      operationId: RessourceId,
    });
    await Payment.succeedById({ paymentId: paymentOperation.payment._id });
    await CampaignOffer.validateById({ offerId: paymentOperation.payment.offer });
  }),
);

router.get(
  '/webhooks/mangopay/payout-normal-failed',
  mangopayWebhook('PAYOUT_NORMAL_FAILED', async ({ RessourceId }) => {
    logger.error(`PayOut failed for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.failById({ operationId: RessourceId });
    await Payment.failById({ paymentId: paymentOperation.payment._id });
  }),
);

router.get(
  '/webhooks/mangopay/transfer-normal-succeeded',
  mangopayWebhook('TRANSFER_NORMAL_SUCCEEDED', async ({ RessourceId }) => {
    logger.info(`Transfer succeeded for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.succeedById({
      operationId: RessourceId,
    });
    if (isTransferIn(paymentOperation)) {
      await Payment.succeedById({ paymentId: paymentOperation.payment._id });
      await CampaignOffer.validateFundsById({ offerId: paymentOperation.payment.offer });
    } else if (isTransferOut(paymentOperation)) {
      await Payment.payOutById({ paymentId: paymentOperation.payment._id });
    }
  }),
);

router.get(
  '/webhooks/mangopay/transfer-normal-failed',
  mangopayWebhook('TRANSFER_NORMAL_FAILED', async ({ RessourceId }) => {
    logger.error(`Transfer failed for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.failById({ operationId: RessourceId });
    await Payment.failById({ paymentId: paymentOperation.payment._id });
  }),
);

router.get(
  '/webhooks/mangopay/kyc-succeeded',
  mangopayWebhook('KYC_SUCCEEDED', ({ RessourceId }) =>
    KycValidation.validateByDocumentId({ documentId: RessourceId }),
  ),
);

router.get(
  '/webhooks/mangopay/kyc-failed',
  mangopayWebhook('KYC_FAILED', ({ RessourceId }) =>
    KycValidation.refuseByDocumentId({ documentId: RessourceId }),
  ),
);

router.get(
  '/articles',
  handleErrors(async (req, res) => {
    const articles = await Article.list.bind(Article)();
    const categories = await Category.list.bind(Category)();

    res.json({ ...articles, ...categories });
  }),
);

router.get(
  '/articles/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const article = await Article.getBySlug({ slug });
    res.json(article);
  }),
);

router.get('/faqs', listCollection(FAQ.list.bind(FAQ)));

router.get(
  '/faq/search',
  handleErrors(async (req, res) => {
    const faqs = await FAQ.list.bind(FAQ);

    // nextApp.render(req, res, '/contact/apropos', {
    //   ...faqs,
    // })
  }),
);

router.get(
  '/blogs',
  handleErrors(async (req, res) => {
    const articles = await Article.list();
    const categories = await Category.list();

    res.json({ ...articles, ...categories });
  }),
);

router.post(
  '/contact',
  handleErrors(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, company, /* sector?, */ position, message } = req.body;
    const params = {
      firstName: escape(firstName),
      lastName: escape(lastName),
      email: escape(email),
      phoneNumber: escape(phoneNumber),
      company: escape(company),
      position: escape(position),
      message: escape(message),
    }
    const { template } = await EmailTemplate.getFilledBySlug({
      slug: "contact",
      params,
    });
    await sendMail({
      to: process.env.CONTACT_RECIPIENT,
      subject: template.subject,
      content: template.message,
    });
    res.status(204).end();
  }),
)

module.exports = router;
