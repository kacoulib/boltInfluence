const rpn = require('request-promise-native');

const TWITCH_API_URL = 'https://api.twitch.tv/helix/';
const TWITCH_ID_URL = 'https://id.twitch.tv/';

class Twitch {
  /**
   *
   * @param {Object} options
   * @param {String} options.clientId
   * @param {String} options.clientSecret
   * @param {String} options.accessToken
   * @param {String} options.refreshToken
   */
  constructor({ clientId, clientSecret, accessToken, refreshToken }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.refresh = this.refresh.bind(this);
    this.get = this.get.bind(this);
  }

  async refresh() {
    const options = {
      method: 'POST',
      uri: `${TWITCH_ID_URL}oauth2/token`,
      form: {
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: encodeURIComponent(this.refreshToken),
      },
      json: true,
    };
    const { access_token: accessToken, refresh_token: refreshToken } = await rpn(options);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    // TODO: Update tokens in the database
  }

  /**
   *
   * @param {Object} options
   * @param {String} options.endpoint
   * @param {Object} [options.query]
   * @param {Boolean} [options.hasRefreshed=false]
   */
  async get({ endpoint, query, hasRefreshed = false }) {
    const options = {
      method: 'GET',
      uri: `${TWITCH_API_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      qs: query,
      json: true,
    };
    try {
      const data = await rpn(options);
      return data;
    } catch (err) {
      console.error(err.message);
      if (err.statusCode === 401 && !hasRefreshed) {
        await this.refresh();
        return this.get({ endpoint, query, hasRefreshed: true });
      }
      throw err;
    }
  }
}

module.exports = {
  Twitch,
};
