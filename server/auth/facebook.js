const { Strategy: FacebookStrategy } = require('passport-facebook');
const passport = require('passport');
const FB = require('fb');

const User = require('../models/User');
const { redirecAfterAuth } = require('./index');

function auth({ ROOT_URL, app }) {
  const uri = '/auth/facebook/oauth2callback';
  const redirectUri = ROOT_URL + uri;
  const verify = async (accessToken, refreshToken, profile, verified) => {
    console.log('ACCESS', accessToken);
    console.log('REFRESH', refreshToken);
    console.log('PROFILE', profile);
    const fbUser = FB.extend({
      accessToken,
      appId: process.env.Facebook_clientId,
      appSecret: process.env.Facebook_clientSecret,
      version: 'v3.2',
    });
    const userFb = await fbUser.api(
      'me?fields=id,address,birthday,email,first_name,last_name,languages,picture,gender,accounts{fan_count}',
    );
    console.log('DATA', JSON.stringify(userFb, null, 2));
    if (!userFb.accounts || userFb.accounts.data.length === 0) {
      return verified(new Error('You need to link a page.'));
    }
    console.log('FAN_COUNT:', userFb.accounts.data.sort((a, b) => a.fan_count - b.fan_count)[0]);

    const { provider } = profile;
    const { id: socialUserId, email, first_name: firstName, last_name: lastName } = userFb;

    try {
      const user = await User.signInOrSignUp({
        provider,
        socialUserId,
        firstName,
        lastName,
        email,
        token: { accessToken, refreshToken },
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.Facebook_clientId,
        clientSecret: process.env.Facebook_clientSecret,
        callbackURL: redirectUri,
        scope: ['email', 'pages_show_list', 'user_gender', 'user_birthday'],
        state: true,
      },
      verify,
    ),
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    },
  );

  app.get(uri, passport.authenticate('facebook', { failureRedirect: '/login' }), redirecAfterAuth);
}

module.exports = auth;
