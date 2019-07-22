const InstagramStrategy = require('passport-instagram').Strategy;
const passport = require('passport');
const Instagram = require('node-instagram').default;

const User = require('../models/User');
const { redirecAfterAuth } = require('./index');

function auth({ ROOT_URL, app }) {
  const uri = '/auth/instagram/oauth2callback';
  const redirect_uri = ROOT_URL + uri;
  const verify = async (accessToken, refreshToken, profile, verified) => {
    const { profile_picture, username } = profile._json.data;

    /* TESTING INSTAGRAM */
    const instagram = new Instagram({
      clientId: process.env.Instagram_clientId,
      clientSecret: process.env.Instagram_clientSecret,
      accessToken,
    });
    const data = await instagram.get('users/self');
    console.log(data);
    /* END TESTING INSTAGRAM */

    try {
      const user = await User.signInOrSignUp({
        provider: profile.provider,
        socialUserId: profile.id,
        token: { accessToken, refreshToken },
        firstName: username,
        lastName: username,
        avatarUrl: profile_picture,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };

  passport.use(
    new InstagramStrategy(
      {
        clientID: process.env.Instagram_clientId,
        clientSecret: process.env.Instagram_clientSecret,
        callbackURL: redirect_uri,
      },
      verify,
    ),
  );

  app.get(
    '/auth/instagram',
    passport.authenticate('instagram', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    },
  );

  app.get(uri, passport.authenticate('instagram', { failureRedirect: '/login' }), redirecAfterAuth);
}

module.exports = auth;
