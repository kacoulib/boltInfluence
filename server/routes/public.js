const express = require('express');

const KycValidation = require('../models/KycValidation');
const Payment = require('../models/Payment');
const PaymentOperation = require('../models/PaymentOperation');
const CampaignOffer = require('../models/CampaignOffer');
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
  mangopayWebhook('PAYIN_NORMAL_FAILED', ({ RessourceId }) =>
    logger.error(`PayIn failed for ${RessourceId}`),
  ),
);

router.get(
  '/webhooks/mangopay/transfer-normal-succeeded',
  mangopayWebhook('TRANSFER_NORMAL_SUCCEEDED', async ({ RessourceId }) => {
    logger.info(`Transfer succeeded for ${RessourceId}`);
    const { paymentOperation } = await PaymentOperation.succeedById({
      operationId: RessourceId,
    });
    await Payment.succeedById({ paymentId: paymentOperation.payment });
    await CampaignOffer.validateFundsById({ offerId: paymentOperation.payment.offer });
  }),
);

router.get(
  '/webhooks/mangopay/transfer-normal-failed',
  mangopayWebhook('TRANSFER_NORMAL_FAILED', ({ RessourceId }) =>
    logger.error(`Transfer failed for ${RessourceId}`),
  ),
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

// DONE: Can refactor those two webhook routes
// router.get('/webhooks/mangopay/kyc-succeeded', async (req, res) => {
//   let EventType;
//   let RessourceId;

//   try {
//     EventType = req.query.EventType;
//     RessourceId = req.query.RessourceId;

//     if (EventType !== 'KYC_SUCCEEDED' || !RessourceId) {
//       return res.status(400).end();
//     }

//     res.status(200).end();
//   } catch (err) {
//     logger.error(err);
//     return res.json({ error: err.message || err.toString() });
//   }

//   try {
//     await KycValidation.validateByDocumentId({ documentId: RessourceId });
//     // TODO: Send mail to user
//   } catch (err) {
//     logger.error(err);
//     // TODO: Report error somewhere
//   }
// });

// router.get('/webhooks/mangopay/kyc-failed', async (req, res) => {
//   let EventType;
//   let RessourceId;

//   try {
//     EventType = req.query.EventType;
//     RessourceId = req.query.RessourceId;

//     if (EventType !== 'KYC_FAILED' || !RessourceId) {
//       return res.status(400).end();
//     }

//     res.status(200).end();
//   } catch (err) {
//     return res.json({ error: err.message || err.toString() });
//   }

//   try {
//     await KycValidation.refuseByDocumentId({ documentId: RessourceId });
//     // TODO: Send mail to user
//   } catch (err) {
//     logger.error(err);
//     // TODO: Report error somewhere
//   }
// });

// router.get('/books', async (req, res) => {
//   try {
//     const books = await Book.list();
//     res.json(books);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.get('/books/:slug', async (req, res) => {
//   try {
//     const book = await Book.getBySlug({ slug: req.params.slug, userId: req.user && req.user.id });
//     res.json(book);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.get('/get-chapter-detail', async (req, res) => {
//   try {
//     const { bookSlug, chapterSlug } = req.query;
//     const chapter = await Chapter.getBySlug({
//       bookSlug,
//       chapterSlug,
//       userId: req.user && req.user.id,
//       isAdmin: req.user && req.user.isAdmin,
//     });
//     res.json(chapter);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

module.exports = router;
