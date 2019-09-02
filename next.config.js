// next.config.js
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const webpack = require('webpack');

module.exports = withImages(withCSS(
  {
    cssLoaderOptions: {
      url: false,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ROOT_URL': JSON.stringify(process.env.ROOT_URL),
        })
      );

      return config;
    },
    exportPathMap() {
      return {
        '/': { page: '/' },
      };
    },
  }),
);
