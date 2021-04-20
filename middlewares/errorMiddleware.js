const { StatusCodes } = require('http-status-codes');
const { handleError } = require('../helpers/error');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) {
    handleError(err, res);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
    console.error(err.message);
  }
};

module.exports = errorMiddleware;
