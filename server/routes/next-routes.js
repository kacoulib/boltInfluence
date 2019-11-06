const routes = require('next-routes')

module.exports = routes()
    .add('influencer/campagn/[slug]', '/influencer/campagn/:slug')
    .add('influencer/campagn/apply/[slug]', '/influencer/campagn/apply/:slug')