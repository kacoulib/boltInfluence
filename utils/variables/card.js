const CbVisaMastercard = 'CB_VISA_MASTERCARD';
const Diners = 'DINERS';
const Maestro = 'MAESTRO';
const CardTypeList = [CbVisaMastercard, Diners, Maestro];

const isCbVisaMastercard = (card) => {
  if (/^(4|5[1-5])/.test(card)) return true;
  const nb = Number(card.slice(0, 4));
  return nb >= 2221 && nb <= 2720;
};
const isDiners = (card) => /^(36|30[0-5]|3095|3[89])/.test(card);
const isMaestro = (card) => /^(6759|67677[04]|50|5[6-9]|6[0-9])/.test(card);

/**
 * Get the type of a clean card string
 * @param {String} card
 * @returns {?String} The type of the card, null if none detected/supported.
 */
const getCardType = (card) => {
  const tests = [[isCbVisaMastercard, CbVisaMastercard], [isDiners, Diners], [isMaestro, Maestro]];
  let type = null;

  tests.some(([test, value]) => {
    const is = test(card);

    if (is) type = value;
    return is;
  });
  return type;
};

/**
 * Clean a card string, leaving only digits
 * @param {String} card - Raw card string
 * @returns {String} Cleaned card string, with only digits
 */
const cleanCard = (card) => card.replace(/[^0-9]/g, '');

module.exports = {
  CbVisaMastercard,
  Diners,
  Maestro,
  CardTypeList,

  isCbVisaMastercard,
  isDiners,
  isMaestro,

  getCardType,
  cleanCard,
};
