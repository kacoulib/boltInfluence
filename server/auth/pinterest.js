const { Strategy: PinterestStrategy } = require('passport-pinterest');
const passport = require('passport');
const PDK = require('node-pinterest');

const User = require('../models/User');
const { redirecAfterAuth } = require('./index');
const { storeSignUpInfos, consumeSignUpInfos } = require('../utils/express');

function auth({ ROOT_URL, app }) {
  const uri = '/auth/pinterest/oauth2callback';
  const redirectUri = ROOT_URL + uri;
  const verify = async (accessToken, refreshToken, profile, verified) => {
    console.log('ACCESS', accessToken);
    console.log('REFRESH', refreshToken);
    console.log('PROFILE', profile);
    const pinterest = PDK.init(accessToken);
    const data = await pinterest.api('me');
    console.log('DATA', data);
    verified('ERROR');
    // try {
    //   const user = await User.signInOrSignUp({
    //     provider: profile.provider,
    //     socialUserId: profile.id,
    //     token: { accessToken, refreshToken },
    //     firstName: username,
    //     lastName: username,
    //     avatarUrl: profile_picture,
    //   });
    //   verified(null, user);
    // } catch (err) {
    //   verified(err);
    //   console.log(err); // eslint-disable-line
    // }
  };

  passport.use(
    new PinterestStrategy(
      {
        clientID: process.env.Pinterest_clientId,
        clientSecret: process.env.Pinterest_clientSecret,
        callbackURL: redirectUri,
        scope: ['read_public'],
        state: true,
      },
      verify,
    ),
  );

  app.get(
    '/auth/pinterest',
    storeSignUpInfos,
    passport.authenticate('pinterest', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    },
  );

  app.get(
    uri,
    passport.authenticate('pinterest', { failureRedirect: '/login' }),
    consumeSignUpInfos,
    redirecAfterAuth,
  );
}

module.exports = auth;
