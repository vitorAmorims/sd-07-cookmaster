const { StatusCodes } = require('http-status-codes');

const errorMiddleware = (err, _req, res, _next) => {
 if (err.isError) {
   return res.status(err.status).json(err.message);
 }
 console.error('MiddlewareError', err.message);
 return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  error: 'Deu ruim...',
 });
};

module.exports = errorMiddleware;
