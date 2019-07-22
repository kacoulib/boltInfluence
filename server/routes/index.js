const publicApi = require('./public');
const customerApi = require('./customer');
const businessApi = require('./business');
const adminApi = require('./admin');

function api(server) {
  server.use('/api/v1/public', publicApi);
  server.use('/api/v1/customer', customerApi);
  server.use('/api/v1/business', businessApi);
  server.use('/api/v1/admin', adminApi);
}

module.exports = api;
