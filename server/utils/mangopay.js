const MangoPay = require('mangopay2-nodejs-sdk');

let api = null;

const setUp = (options) => {
  api = new MangoPay(options);
  return api;
};

const get = () => {
  if (api === null) throw new Error('MangoPay not initialized!');
  return api;
};

get.setUp = setUp;

module.exports = get;
