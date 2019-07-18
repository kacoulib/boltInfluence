const PayIn = 'payin';
const TransferIn = 'transferin';
const TransferOut = 'transferout';
const PayOut = 'payout';
const PaymentOperationTypeList = [PayIn, TransferIn, TransferOut, PayOut];

const isPayIn = (operation) => operation && operation.operationType === PayIn;
const isTransferIn = (operation) => operation && operation.operationType === TransferIn;
const isTransferOut = (operation) => operation && operation.operationType === TransferOut;
const isPayOut = (operation) => operation && operation.operationType === PayOut;

module.exports = {
  PayIn,
  TransferIn,
  TransferOut,
  PayOut,
  PaymentOperationTypeList,

  isPayin: isPayIn,
  isTransferIn,
  isTransferOut,
  isPayOut,
};
