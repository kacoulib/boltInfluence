const { Strategy } = require('passport-twitch-helix');
const passport = require('passport');

const { redirecAfterAuth } = require('./index');
const User = require('../models/User');
const logger = require('../logs');
const { Twitch } = require('../utils/twitch');

const auth = ({ app, ROOT_URL }) => {
  const uri = '/auth/twitch/oauth2callback';
  const redirectUri = ROOT_URL + uri;
  const verify = async (accessToken, refreshToken, profile, cb) => {
    // console.log('TOKEN', accessToken);
    // console.log('REFRESH TOKEN', refreshToken);
    // console.log('PROFILE', profile);

    /* TESTING TWITCH API */
    const twitch = new Twitch({
      clientId: process.env.Twitch_clientId,
      clientSecret: process.env.Twitch_clientSecret,
      accessToken,
      refreshToken,
    });
    const data = await twitch.get({
      endpoint: 'users/follows',
      query: { to_id: profile.id, first: 1 },
    });
    console.log('FOLLOWERS:', data.total);
    /* END TESTING TWITCH API */
    const {
      provider,
      login: screenName,
      profile_image_url: avatarUrl,
      id: socialUserId,
      email,
    } = profile;
    const firstName = screenName;
    const lastName = screenName;

    try {
      const user = await User.signInOrSignUp({
        provider,
        socialUserId,
        email,
        token: { accessToken, refreshToken },
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
        clientID: process.env.Twitch_clientId,
        clientSecret: process.env.Twitch_clientSecret,
        callbackURL: redirectUri,
      },
      verify,
    ),
  );

  app.get('/auth/twitch', passport.authenticate('twitch', { scope: ['user:read:email'] }));

  app.get(uri, passport.authenticate('twitch', { failureRedirect: '/login' }), redirecAfterAuth);
};

module.exports = auth;
