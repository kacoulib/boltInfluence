// @ts-check
const { google } = require('googleapis');
const Twitter = require('twitter');
const { default: Instagram } = require('node-instagram');
const FB = require('fb');

const { Twitch } = require('../utils/twitch');

/**
 * @typedef Stats
 * @property {String} media
 * @property {Number} value
 */

/**
 *
 * @param {Object} options
 * @param {String} options.provider
 * @param {String} options.accessToken
 * @param {String} options.refreshToken
 * @returns {Promise<{stats: Stats}>}
 */
const getYoutubeStats = async ({ provider, accessToken, refreshToken }) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.Google_clientId,
    process.env.Google_clientSecret,
  );

  oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const {
    data: { items: channels },
  } = await youtube.channels.list({
    part: 'statistics',
    mine: true,
  });

  if (channels.length === 0) {
    throw new Error('User has no Youtube Channel');
  }

  channels.sort(
    (a, b) => Number(a.statistics.subscriberCount) - Number(b.statistics.subscriberCount),
  );
  return {
    stats: {
      media: provider,
      value: Number(channels[0].statistics.subscriberCount),
    },
  };
};

/**
 *
 * @param {Object} options
 * @param {String} options.provider
 * @param {String} options.accessToken
 * @returns {Promise<{stats: Stats}>}
 */
const getInstagramStats = async ({ provider, accessToken }) => {
  const instagram = new Instagram({
    clientId: process.env.Instagram_clientId,
    clientSecret: process.env.Instagram_clientSecret,
    accessToken,
  });
  const {
    data: {
      counts: { followed_by: value },
    },
  } = await instagram.get('users/self');
  return { stats: { media: provider, value } };
};

/**
 *
 * @param {Object} options
 * @param {String} options.provider
 * @param {String} options.accessToken
 * @param {String} options.accessTokenSecret
 * @returns {Promise<{stats: Stats}>}
 */
const getTwitterStats = async ({ provider, accessToken, accessTokenSecret }) => {
  const client = new Twitter({
    consumer_key: process.env.Twitter_consumerKey,
    consumer_secret: process.env.Twitter_consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret,
  });
  const data = await client.get('account/verify_credentials', {
    include_email: true,
    skip_status: true,
    include_entities: false,
  });
  return {
    stats: {
      media: provider,
      value: data.followers_count,
    },
  };
};

/**
 *
 * @param {Object} options
 * @param {String} options.provider
 * @param {String} options.accessToken
 * @param {String} options.refreshToken
 * @returns {Promise<{stats: Stats}>}
 */
const getTwitchStats = async ({ provider, accessToken, refreshToken }) => {
  const twitch = new Twitch({
    clientId: process.env.Twitch_clientId,
    clientSecret: process.env.Twitch_clientSecret,
    accessToken,
    refreshToken,
  });
  let data = await twitch.get({ endpoint: 'users' });
  if (data.data.length === 0) {
    throw new Error('Invalid Twitch token');
  }
  const { id } = data.data[0];
  data = await twitch.get({
    endpoint: 'users/follows',
    query: { to_id: id, first: 1 },
  });
  return {
    stats: {
      media: provider,
      value: data.total,
    },
  };
};

/**
 * @param {Object} options
 * @param {String} options.provider
 * @param {String} options.accessToken
 * @param {String} options.refreshToken
 */
const getFacebookStats = async ({ provider: media, accessToken, refreshToken }) => {
  const fbUser = FB.extend({
    accessToken,
    appId: process.env.Facebook_clientId,
    appSecret: process.env.Facebook_clientSecret,
    version: 'v3.2',
  });
  const userFb = await fbUser.api(
    'me?fields=id,address,birthday,email,first_name,last_name,languages,picture,gender,accounts{fan_count}',
  );
  const value =
    (((userFb.accounts || {}).data || []).sort((a, b) => a.fan_count - b.fan_count)[0] || {})
      .fan_count || 0;
  return {
    stats: {
      media,
      value,
    },
  };
};

/**
 * @type {Readonly<Object<string, (...arg: any[]) => Promise<{stats: Stats}>>>}
 */
const providerFunctions = Object.freeze({
  google: getYoutubeStats,
  instagram: getInstagramStats,
  twitter: getTwitterStats,
  twitch: getTwitchStats,
  facebook: getFacebookStats,
});

/**
 * Get stats for provider with corresponding tokens.
 * @param {Object} options
 * @param {String} options.provider
 * @param {String} options.accessToken
 * @param {String} [options.refreshToken]
 * @param {String} [options.accessTokenSecret]
 * @returns {Promise<{stats: ?Stats}>}
 */
const getStats = async ({ provider, accessToken, refreshToken, accessTokenSecret }) => {
  const fn = providerFunctions[provider];
  if (!fn) {
    return { stats: null };
  }
  return fn({ provider, accessToken, refreshToken, accessTokenSecret });
};

module.exports = {
  getStats,
};
