const publicApi = require('./public');
const customerApi = require('./customer');
const influencerApi = require('./influencer');
const businessApi = require('./business');
const adminApi = require('./admin');

function api(app) {
  app.use('/api/v1/public', publicApi);
  app.use('/api/v1/customer', customerApi);
  app.use('/api/v1/influencer', influencerApi);
  app.use('/api/v1/business', businessApi);
  app.use('/api/v1/admin', adminApi);
}

module.exports = api;
