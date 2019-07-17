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
 * @returns {Promise<String>} The ID of the created or updated Bank Account.
 * If no updates done, the old ID is returned.
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
  let bankAccountId = oldBankAccountId;
  if (oldBankAccountId) {
    const bankAccount = await api.Users.getBankAccount(user, oldBankAccountId);
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
    const bankAccount = await api.Users.createBankAccount(user, model);
    bankAccountId = bankAccount.Id;
    if (deactivate) {
      await api.Users.deactivateBankAccount(user, oldBankAccountId);
    }
  }
  return bankAccountId;
};

module.exports = {
  getMangopay,
  setupMangopay,
  createWallet,
  createOrUpdateIbanBankAccount,
};
