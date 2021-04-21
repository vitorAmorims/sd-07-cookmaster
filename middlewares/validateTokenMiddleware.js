const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../helpers/error');
const cryptography = require('../helpers/cryptography');

const validateTokenMiddleware = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    cryptography.getDataByToken(token);
    next();
  } catch (error) {
    next(new ErrorHandler(
      StatusCodes.UNAUTHORIZED,
      error.message,
    ));
  }
};

module.exports = validateTokenMiddleware;
