const crypto = require('crypto');

const generateSig = (endpoint, params, secret) => {
  const sig =
    endpoint +
    Object.keys(params)
      .sort()
      .map((key) => `|${key}=${params[key]}`)
      .join('');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(sig);
  return hmac.digest('hex');
};

module.exports = {
  generateSig,
};
