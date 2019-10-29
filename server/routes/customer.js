const express = require('express');

const Payment = require('../models/Payment');
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const { handleErrors, listCollection, verifyKycUser } = require('../utils/express');
const { kycFileUpload } = require('../utils/multer');
const { registerCard } = require('../utils/mangopay');

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
      haveChildren,
      siret,
      phone,
      bio,
      companyEmail,
      companyName,
      companySize,
      placeOfBirth,
      dateOfBirth,
      civilState,
      interests,
      categories,

      email,
      iban,
      rib,
      bic,
      paypal,
      factureAddress,
      factureCity,
      facturePostalCode,
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
      haveChildren,
      siret,
      phone,
      bio,
      companyEmail,
      companyName,
      companySize,
      placeOfBirth,
      dateOfBirth,
      slug,
      civilState,
      interests,
      categories,

      email,
      iban,
      rib,
      bic,
      paypal,
      factureAddress,
      factureCity,
      facturePostalCode,
    });
    res.json({ profile: user });
  }),
);

router.post(
  '/profile/kyc-identity',
  kycFileUpload,
  verifyKycUser(User.addIdentityProofBySlug.bind(User)),
);

router.post(
  '/profile/kyc-registration',
  kycFileUpload,
  verifyKycUser(User.addRegistrationProofBySlug.bind(User)),
);

router.post(
  '/profile/kyc-association',
  kycFileUpload,
  verifyKycUser(User.addArticlesOfAssociationBySlug.bind(User)),
);

router.get('/campaigns', listCollection(Campaign.list.bind(Campaign, {})));

router.get(
  '/campaigns/:slug',
  handleErrors(async (req, res) => {
    const { slug } = req.params;
    const campaign = await Campaign.getBySlug({ slug, showOffers: false });
    res.json(campaign);
  }),
);

router.get('/payments', (req, res) =>
  listCollection((listingOptions) => {
    const { _id: user } = req.user;

    return Payment.listForUserById({ user }, listingOptions);
  })(req, res),
);

router.post(
  '/cards/preregister',
  handleErrors(async (req, res) => {
    const { cardType, currency } = req.body;
    const { slug } = req.user;
    const registration = await User.preregisterCardBySlug({ slug, cardType, currency });
    res.json(registration);
  }),
);

router.post(
  '/cards/register',
  handleErrors(async (req, res) => {
    const { registrationId, registrationData } = req.body;
    await registerCard({ registrationId, registrationData });
    res.status(204).end();
  }),
);

// List of API:
// 1. /buy-book
// 2. /my-books

module.exports = router;
