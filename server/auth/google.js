const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const { google } = require('googleapis');

const User = require('../models/User');
const { redirecAfterAuth } = require('./index');

function auth({ ROOT_URL, app }) {
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;
    let firstName;
    let lastName;

    /* TESTING YOUTUBE */
    const oauth2Client = new google.auth.OAuth2(
      process.env.Google_clientId,
      process.env.Google_clientSecret,
    );

    oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const stats = await youtube.channels.list({
      part: 'statistics',
      mine: true,
    });
    console.log(stats.data.items);
    /* END TESTING YOUTUBE */

    if (profile.emails) {
      email = profile.emails[0].value;
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }
    if (profile.name && profile.name.familyName) {
      lastName = profile.name.familyName;
    } else {
      lastName = profile.displayName;
    }
    if (profile.name && profile.name.givenName) {
      firstName = profile.name.givenName;
    } else {
      firstName = profile.displayName;
    }
    try {
      const user = await User.signInOrSignUp({
        provider: profile.provider,
        socialUserId: profile.id,
        email,
        token: { accessToken, refreshToken },
        firstName,
        lastName,
        avatarUrl,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };
  passport.use(
    new Strategy(
      {
        clientID: process.env.Google_clientId,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verify,
    ),
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'],
      prompt: 'select_account',
    }),
  );

  app.get(
    '/oauth2callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    redirecAfterAuth,
  );
}

module.exports = auth;
