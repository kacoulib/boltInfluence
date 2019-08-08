const routes = require('next-routes')

module.exports = routes()
    .add('notre-methode/blog/single', '/notre-methode/blog/:slug')