const publicApi = require('./public');
const customerApi = require('./customer');
const influencerApi = require('./influencer');
const businessApi = require('./business');
const adminApi = require('./admin');

function api(server, nextApp) {
  server.use('/api/v1/public', publicApi);
  server.use('/api/v1/customer', customerApi);
  server.use('/api/v1/influencer', influencerApi);
  server.use('/api/v1/business', businessApi);
  server.use('/api/v1/admin', adminApi);
}

module.exports = api;
