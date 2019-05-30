var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const CompanyModel = require('../models/Company');
const { redirecAfterAuth } = require('./index')


const auth = ({ server }) => {

    const verify = async (req, email, password, cb) => {
        const { body: { firstName, lastName, companyName } } = req;

        try {
            const user = await UserModel.signInOrSignUp({
                firstName,
                lastName,
                email
            });
            const company = await CompanyModel.findOne({ name: companyName });
            if (!company)
                await CompanyModel.add({
                    userId: user._id,
                    name: companyName
                })
            cb(null, user)
        } catch (err) {
            console.log(err); // eslint-disable-line
        }
    }
    passport.use(new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        verify));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        UserModel.findById(id, (err, user) => {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    server.use(passport.initialize());
    server.use(passport.session());

    server.post('/auth/basic', passport.authenticate('local', { failureRedirect: '/login' }), redirecAfterAuth)

}
module.exports = auth;
