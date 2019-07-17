const Proposed = 'proposed';
const AwaitingFunding = 'awaiting-funding';
const Ongoing = 'ongoing';
const AwaitingValidation = 'awaiting-validation';
const Disputed = 'disputed';
const Validated = 'validated';

const CampaignOfferStatusList = [
  Proposed,
  AwaitingFunding,
  Ongoing,
  AwaitingValidation,
  Disputed,
  Validated,
];

const isProposed = (offer) => offer && offer.status === Proposed;
const isAwaitingFunding = (offer) => offer && offer.status === AwaitingFunding;
const isOngoing = (offer) => offer && offer.status === Ongoing;
const isAwaitingValidation = (offer) => offer && offer.status === AwaitingValidation;
const isDisputed = (offer) => offer && offer.status === Disputed;
const isValidated = (offer) => offer && offer.status === Validated;

module.exports = {
  Proposed,
  AwaitingFunding,
  Ongoing,
  AwaitingValidation,
  Disputed,
  Validated,
  CampaignOfferStatusList,

  isProposed,
  isAwaitingFunding,
  isOngoing,
  isAwaitingValidation,
  isDisputed,
  isValidated,
};
