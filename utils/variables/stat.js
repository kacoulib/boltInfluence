const Open = 'open';
const Close = 'close';
const OfferStatusList = [Open, Close];

const isOpen = (stat) => stat && stat.offerStatus === Open;
const isClose = (stat) => stat && stat.offerStatus === Close;

module.exports = {
  Open,
  Close,
  OfferStatusList,

  isOpen,
  isClose,
};
