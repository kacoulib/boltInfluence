const MangoPay = require('mangopay2-nodejs-sdk');

let api = null;

const setupMangopay = (options) => {
  api = new MangoPay(options);
  return api;
};

const getMangopay = () => {
  if (api === null) throw new Error('MangoPay not initialized!');
  return api;
};

/**
 * Create a MangoPay Wallet with a single owner
 * @param {Object} options
 * @param {String} options.owner - Wallet's owner
 * @param {String} options.description - Wallet's description
 * @param {String} options.currency - Wallet's currency
 */
const createWallet = async ({ owner, description, currency = 'EUR' } = {}) => {
  const model = new api.models.Wallet({
    Owners: [owner],
    Description: description,
    Currency: currency,
  });
  const wallet = await api.Wallets.create(model);

  return { wallet };
};

/**
 * Either create a new BankAccount or update an existing one.
 * Note that updating happens by creating a new BankAccount
 * and deactivating the old one.
 * @param {Object} options
 * @param {String} options.user - Owner Id
 * @param {String} options.name - Owner name
 * @param {String} options.address - Owner address
 * @param {String} options.city - Owner city
 * @param {String} options.country - Owner country
 * @param {String} options.postalCode - Owner postal code
 * @param {String} options.iban - Bank Account IBAN
 * @param {String} options.bic - Bank Account BIC
 * @param {String} options.oldBankAccountId - ID of the Bank Account to update
 * @returns {Promise<Object>} The created or updated Bank Account.
 * If no updates done, the old one is returned.
 */
const createOrUpdateIbanBankAccount = async ({
  user,
  name,
  address,
  city,
  country,
  postalCode,
  iban,
  bic,
  oldBankAccountId,
} = {}) => {
  const model = new api.models.BankAccount({
    UserId: user,
    Type: 'IBAN',
    OwnerName: name,
    OwnerAddress: new api.models.Address({
      AddressLine1: address,
      City: city,
      PostalCode: postalCode,
      Country: country,
    }),
    Details: new api.models.BankAccountDetailsIBAN({
      IBAN: iban,
      BIC: bic,
    }),
  });
  let createNew = true;
  let deactivate = false;
  let bankAccount;
  if (oldBankAccountId) {
    bankAccount = await api.Users.getBankAccount(user, oldBankAccountId);
    const anyAddressDiff = ['AddressLine1', 'City', 'PostalCode', 'Country'].some(
      (p) => bankAccount.OwnerAddress[p] !== model.OwnerAddress[p],
    );
    if (
      anyAddressDiff ||
      bankAccount.IBAN !== model.Details.IBAN ||
      bankAccount.BIC !== model.Details.BIC
    ) {
      deactivate = true;
    } else {
      createNew = false;
    }
  }
  if (createNew) {
    bankAccount = await api.Users.createBankAccount(user, model);
    if (deactivate) {
      await api.Users.deactivateBankAccount(user, oldBankAccountId);
    }
  }
  return { bankAccount };
};

/**
 * Create a MangoPay Card Direct PayIn
 * @param {Object} options
 * @param {String} options.user - ID of the PayIn Author
 * @param {String} options.card - ID of the card used
 * @param {Number} options.amount - Amount of money to pay
 * @param {String} options.creditedWallet - ID of the wallet to credit
 * @param {String} options.description - Statement Description
 * @param {String} options.currency - Currency used for the PayIn
 * @returns {Promise<String>} The newly created PayIn ID
 */
const createCardDirectPayIn = async ({
  user,
  card,
  amount,
  creditedWallet,
  description,
  currency = 'EUR',
} = {}) => {
  const model = new api.models.PayIn({
    AuthorId: user,
    DebitedFunds: new api.models.Money({
      Currency: currency,
      Amount: amount,
    }),
    Fees: new api.models.Money({
      Currency: currency,
      Amount: 0,
    }),
    CreditedWalletId: creditedWallet,
    PaymentType: 'CARD',
    PaymentDetails: new api.models.PayInPaymentDetailsCardDirect({
      StatementDescriptor: description,
      CardId: card,
    }),
    ExecutionType: 'DIRECT',
    ExecutionDetails: new api.models.PayInExecutionDetailsDirect({
      SecureMode: 'DEFAULT',
      SecureModeReturnUrl: 'http://localhost:3000',
    }),
  });
  const payin = await api.PayIns.create(model);
  return { payin };
};

/**
 * Create a MangoPay Transfer between two Wallets
 * @param {Object} options
 * @param {String} options.debitedUser - ID of the User to debit
 * @param {String} options.debitedWallet - ID of the Wallet to debit
 * @param {String} [options.creditedUser] - ID of the User to credit
 * @param {String} options.creditedWallet - ID of the Wallet to credit
 * @param {Number} options.amount - Amount of money to transfer
 * @param {String} options.currency - Currency used for the transfer
 */
const createTransfer = async ({
  debitedUser,
  debitedWallet,
  creditedUser,
  creditedWallet,
  amount,
  currency = 'EUR',
} = {}) => {
  const model = new api.models.Transfer({
    AuthorId: debitedUser,
    DebitedWalletId: debitedWallet,
    CreditedWalletId: creditedWallet,
    DebitedFunds: new api.models.Money({
      Currency: currency,
      Amount: amount,
    }),
    Fees: new api.models.Money({
      Currency: currency,
      Amount: 0,
    }),
  });
  const transfer = await api.Transfers.create(model);
  return { transfer };
};

/**
 * Create a new MangoPay card registration
 * @param {Object} options
 * @param {String} options.user
 * @param {String} options.cardType
 * @param {String} options.currency
 */
const preregisterCard = async ({ user, cardType, currency = 'EUR' } = {}) => {
  const model = new api.models.CardRegistration({
    UserId: user,
    Currency: currency,
    CardType: cardType,
  });
  const registration = await api.CardRegistrations.create(model);
  return { registration };
};

/**
 * Finish registering a card on MongoPay
 * @param {Object} options
 * @param {String} options.registrationId
 * @param {String} options.registrationData
 */
const registerCard = async ({ registrationId, registrationData }) => {
  const model = new api.models.CardRegistration({
    Id: registrationId,
    RegistrationData: registrationData,
  });
  const registration = await api.CardRegistrations.update(model);
  return { registration };
};

/**
 * Retrieve a MangoPay Wallet
 * @param {Object} options
 * @param {String} options.wallet - ID of the wallet to retrieve
 */
const getWallet = async ({ wallet: walletId }) => {
  const wallet = await api.Wallets.get(walletId);

  return { wallet };
};

module.exports = {
  getMangopay,
  setupMangopay,
  createWallet,
  createOrUpdateIbanBankAccount,
  createCardDirectPayIn,
  preregisterCard,
  registerCard,
  createTransfer,
  getWallet,
};
