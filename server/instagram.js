var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();

function auth({ ROOT_URL, server }) {
  api.use({
    client_id: process.env.Instagram_clientId,
    client_secret: process.env.Instagram_clientSecret
  });
  const uri = '/auth/instagram/oauth2callback'
  var redirect_uri = ROOT_URL + uri;

  console.log(redirect_uri)

  // This is where you would initially send users to authorize
  server.get('/auth/instagram', (req, res) => {
    res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
  });
  // This is your redirect URI
  server.get(uri, (req, res) => {
    api.authorize_user(req.query.code, redirect_uri, function (err, result) {
      if (err) {
        console.log(err.body);
        res.send("Didn't work");
      } else {
        console.log(result)
        console.log('Yay! Access token is ' + result.access_token);
        res.send('You made it!!');
      }
    });
  });

  // http.createServer(app).listen(server.get('port'), function () {
  //   console.log("Express server listening on port " + server.get('port'));
  // });
}

module.exports = auth;
