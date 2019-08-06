const passport = require('passport');
const { Strategy } = require('passport-local');
const UserModel = require('../models/User');
// const CompanyModel = require('../models/Company');

const auth = ({ app }) => {
  const verify = async (req, email, password, cb) => {
    const {
      body: { firstName, lastName, role /* , companyName */ },
    } = req;

    try {
      const user = await UserModel.signInOrSignUp({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      //   let company = await CompanyModel.findOne({ name: companyName });
      //   if (!company)
      //     company = await CompanyModel.add({
      //       userId: user._id,
      //       name: companyName,
      //     });
      //   user.company = company;
      cb(null, user);
    } catch (err) {
      console.log(err); // eslint-disable-line
      if (err.message) return cb(null, null, err);
      cb(err, null);
    }
  };
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      verify,
    ),
  );

  app.post('/auth/basic', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.json({ message: info.message });

      req.login(user, (err) => {
        if (err) return next(err);

        return res.json({ login: true });
      });
    })(req, res, next);
  });
};
module.exports = auth;
