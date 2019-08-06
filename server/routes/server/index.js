const adminRoute = require('./admin');

function route(server, nextApp) {
  server.use('/admin', adminRoute(nextApp));
}

module.exports = route;
