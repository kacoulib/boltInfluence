const { Strategy } = require('passport-twitter');
const passport = require('passport');
const Twitter = require('twitter');

const { redirecAfterAuth } = require('./index');
const User = require('../models/User');
const logger = require('../logs');
const { storeSignUpInfos, consumeSignUpInfos } = require('../utils/express');

const auth = ({ app, ROOT_URL }) => {
  const uri = '/auth/twitter/oauthcallback';
  const redirectUri = ROOT_URL + uri;
  const verify = async (token, tokenSecret, profile, cb) => {
    // console.log('TOKEN', token);
    // console.log('REFRESH TOKEN', tokenSecret);
    // console.log('PROFILE', profile);

    /* TESTING TWITTER API */
    const client = new Twitter({
      consumer_key: process.env.Twitter_consumerKey,
      consumer_secret: process.env.Twitter_consumerSecret,
      access_token_key: token,
      access_token_secret: tokenSecret,
    });
    const data = await client.get('account/verify_credentials', {
      include_email: true,
      skip_status: true,
      include_entities: false,
    });
    console.log('DATA', data);
    /* END TESTING TWITTER API */
    const { provider } = profile;
    const {
      screen_name: screenName,
      profile_image_url_https: avatarUrl,
      id_str: socialUserId,
      email,
    } = data;
    const firstName = screenName;
    const lastName = screenName;

    try {
      const user = await User.signInOrSignUp({
        provider,
        socialUserId,
        email,
        token: { accessToken: token, accessTokenSecret: tokenSecret },
        firstName,
        lastName,
        avatarUrl,
      });
      cb(null, user);
    } catch (err) {
      logger.error(err);
      cb(err);
    }
  };

  passport.use(
    new Strategy(
      {
        consumerKey: process.env.Twitter_consumerKey,
        consumerSecret: process.env.Twitter_consumerSecret,
        callbackURL: redirectUri,
      },
      verify,
    ),
  );

  app.get(
    '/auth/twitter',
    storeSignUpInfos,
    passport.authenticate('twitter'),
  );

  app.get(
    uri,
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    consumeSignUpInfos,
    redirecAfterAuth,
  );
};

module.exports = auth;
