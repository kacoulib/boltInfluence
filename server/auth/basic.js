var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const CompanyModel = require('../models/Company');
const { redirecAfterAuth } = require('./index')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const auth = ({ server, app }) => {

    const verify = async (req, email, password, cb) => {
        const { body: { firstName, lastName, companyName } } = req;

        try {
            const user = await UserModel.signInOrSignUp({
                firstName,
                lastName,
                email
            });
            let company = await CompanyModel.findOne({ name: companyName });
            if (!company)
                company = await CompanyModel.add({
                    userId: user._id,
                    name: companyName
                })
            user.company = company;
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
        console.log('id', id)
        UserModel.findById(id, (err, user) => {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    server.use(passport.initialize());
    server.use(passport.session());
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(cookieParser())

    server.post('/auth/basic', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err)
                return next(err);
            if (!user)
                return res.json({ message: info.message });

            req.login(user, (err) => {
                if (err)
                    return next(err);

                return res.json({ login: true })
            });
        })(req, res, next);
    });

}
module.exports = auth;
