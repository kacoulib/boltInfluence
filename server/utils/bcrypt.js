const bcrypt = require('bcrypt');

/**
 * Generate a salt used for hashing
 * @param {Number} rounds
 * @param {String} minor
 * @returns {Promise<*>}
 */
const genSalt = async (rounds, minor) => {
  return new Promise((resolve, reject) => {
    const cb = (err, salt) => {
      if (err) return reject(err);
      return resolve(salt);
    };
    return bcrypt.genSalt(
      rounds,
      minor !== undefined ? minor : cb,
      minor === undefined ? cb : undefined,
    );
  });
};

/**
 * Hash some data with a given salt
 * @param {String} data
 * @param {String} salt
 * @returns {Promise<String>}
 */
const hash = (data, salt) => {
  return new Promise((resolve, reject) => {
    return bcrypt.hash(data, salt, (err, hashedData) => {
      if (err) return reject(err);
      return resolve(hashedData);
    });
  });
};

/**
 * Compare clear data and hashed data
 * @param {String} data
 * @param {String} hashed
 * @returns {Promise<boolean>}
 */
const compare = (data, hashed) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, isMatch) => {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });
};

module.exports = {
  genSalt,
  hash,
  compare,
};
