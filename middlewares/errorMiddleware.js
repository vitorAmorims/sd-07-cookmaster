const { status } = require('../helpers');

const errorMiddleware = (err, _req, res, _next) => {
 if (err.isError) {
   return res.status(err.status).json(err.message);
 }
 console.error('MiddlewareError', err.message);
  return res.status(status.invalidToken.code).json(status.invalidToken.message);
};

module.exports = errorMiddleware;
