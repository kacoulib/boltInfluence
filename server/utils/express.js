const logger = require('../logs');

/**
 * Creates a middleware that tries to execute a function
 * and catch eventual errors to send them as a json response
 * @param {(req: Request, res: Response) => any} fn
 * @returns {(res: Request, res: Response) => Promise<any>}
 */
const handleErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
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

module.exports = {
  handleErrors,
  listCollection,
};
