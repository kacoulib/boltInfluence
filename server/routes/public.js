const express = require('express');

const KycValidation = require('../models/KycValidation');
const Payment = require('../models/Payment');
const PaymentOperation = require('../models/PaymentOperation');
const CampaignOffer = require('../models/CampaignOffer');
const Article = require('../models/Article');
const { isTransferIn, isTransferOut } = require('../../utils/variables/paymentoperation');
const { handleErrors, listCollection } = require('../utils/express');
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

router.get('/articles', listCollection(Article.list.bind(Article)))

router.get(
  '/articles/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const article = await Article.getBySlug({ slug });
    res.json(article);
  }),
)

module.exports = router;
