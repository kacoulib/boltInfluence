const adminRoute = require('./admin');
const publicRoute = require('./public');

function route(server, nextApp) {
  server.use('/admin', adminRoute(nextApp));
  server.use('/', publicRoute(nextApp));
}

module.exports = route;
