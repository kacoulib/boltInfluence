/**
 * @const
 * @enum {String}
 */
exports.CommissionPlaces = {
  CARD_DIRECT_PAYIN: 'CARD_DIRECT_PAYIN',
  BANKWIRE_DIRECT_PAYIN: 'BANKWIRE_DIRECT_PAYIN',
  TRANSFER_IN_ESCROW: 'TRANSFER_IN_ESCROW',
  TRANSFER_OUT_ESCROW: 'TRANSFER_OUT_ESCROW',
  BANKWIRE_PAYOUT: 'BANKWIRE_PAYOUT',
};

/**
 * @type {Array<String>}
 */
exports.CommissionPlaceList = Array.from(Object.values(exports.CommissionPlaces));
