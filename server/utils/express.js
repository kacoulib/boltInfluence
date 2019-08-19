const logger = require('../logs');
const User = require('../models/User');

/**
 * Creates a middleware that tries to execute a function
 * and catch eventual errors to send them as a json response
 * @param {(req: Request, res: Response) => any} fn
 * @returns {(res: Request, res: Response) => Promise<any>}
 */
const handleErrors = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    logger.error(err);
    res.status(400).json({ error: err.message || err.Message || err.toString() });
  }
};

/**
 * Creates a middleware that extract listing parameters,
 * pass them to a listing function and return the result
 * as a json response
 * @param {(req: Request, res: Response) => any} listFn
 */
const listCollection = (listFn) =>
  handleErrors(async (req, res) => {
    let { offset, limit } = req.query;

    offset = Number(offset) || undefined;
    limit = Number(limit) || undefined;

    res.json(await listFn({ offset, limit }));
  });

const serverListCollection = (nextApp, path, listFn) =>
  handleErrors(async (req, res) => {
    let { offset, limit } = req.query;

    offset = Number(offset) || undefined;
    limit = Number(limit) || undefined;
    return nextApp.render(req, res, path, await listFn({ offset, limit }))
  });

/**
 * @param {(options: { slug: String, file: String }) => any} fn
 * @param {String} slugKey - In which property is the User slug
 */
const verifyKyc = (fn, slugKey) =>
  handleErrors(async (req, res) => {
    const { slug } = req[slugKey];
    const file = req.file.buffer.toString('base64');

    await fn({ slug, file });
    res.status(204).end();
  });

/**
 * @param {(options: { slug: String, file: String }) => any} fn
 */
const verifyKycUser = (fn) => verifyKyc(fn, 'user');

/**
 * @param {(options: { slug: String, file: String }) => any} fn
 */
const verifyKycParams = (fn) => verifyKyc(fn, 'params');

const storeSignUpInfos = handleErrors((req, res, next) => {
  const { firstName, lastName, birthday, postalCode, centersOfInterest } = req.query;
  console.log("AAA");
  if (firstName || lastName || birthday || postalCode || centersOfInterest) {
    console.log("BBB");
    req.session.signUpInfos = {
      firstName,
      lastName,
      birthday,
      postalCode,
      centersOfInterest: Array.isArray(centersOfInterest) ? centersOfInterest : [centersOfInterest],
    };
  }
  console.log("CCC");
  next();
});

const consumeSignUpInfos = handleErrors(async (req, res, next) => {
  if (req.session.signUpInfos) {
    const { firstName, lastName, birthday, postalCode, centersOfInterest } = req.session.signUpInfos;
    const { user } = await User.updateBySlug({
      slug: req.user.slug,
      firstName, lastName,
      dateOfBirth: birthday,
      postalCode,
      influencer: {
        centersOfInterest
      }
    });
    req.user = user;
    delete req.session.signUpInfos;
  }
  next();
});

module.exports = {
  handleErrors,
  listCollection,
  verifyKyc,
  verifyKycUser,
  verifyKycParams,
  serverListCollection,
  storeSignUpInfos,
  consumeSignUpInfos,
};
