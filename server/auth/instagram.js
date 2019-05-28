const User = require('../models/User');

const InstagramStrategy = require('passport-instagram').Strategy
const passport = require('passport')
const { redirecAfterAuth } = require('./index')


function auth({ ROOT_URL, server }) {
  const uri = '/auth/instagram/oauth2callback'
  const redirect_uri = ROOT_URL + uri;
  const verify = async (accessToken, refreshToken, profile, verified) => {
    const { profile_picture, username } = profile._json.data;

    try {
      const user = await User.signInOrSignUp({
        provider: profile.provider,
        socialUserId: profile.id,
        token: { accessToken, refreshToken },
        displayName: username,
        avatarUrl: profile_picture,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (obj, done) {
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });

  passport.use(new InstagramStrategy(
    {
      clientID: process.env.Instagram_clientId,
      clientSecret: process.env.Instagram_clientSecret,
      callbackURL: redirect_uri
    },
    verify
  ));

  server.get('/auth/instagram', passport.authenticate('instagram', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
  });

  server.get(uri, passport.authenticate('instagram', { failureRedirect: '/login' }), redirecAfterAuth)
}

module.exports = auth;
