var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const User = require('../models/User');
const { redirecAfterAuth } = require('./index')


function auth({ ROOT_URL, server }) {

    passport.use(new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, cb) {
            User.findByUsername(email, function (err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                if (user.password != password) { return cb(null, false); }
                return cb(null, user);
            });
        }));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    server.use(passport.initialize());
    server.use(passport.session());

    // server.post('/auth/basic', passport.authenticate('local', { failureRedirect: '/login' }),
    server.post('/auth/basic',
        function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err)
                    console.log(err)
                console.log('ollalala', info)
                res.redirect('/');

            })(req, res, next);
        });

    server.get(
        '/oauth2callback',
        passport.authenticate('basic', {
            failureRedirect: '/login',
        }),
        redirecAfterAuth,
    );
}
module.exports = auth;
