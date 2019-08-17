// next.config.js
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages(
  withCSS({
    cssLoaderOptions: {
      url: false,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
    exportPathMap() {
      return {
        '/': { page: '/' },
      };
    },
  }),
);
