const { StatusCodes } = require('http-status-codes');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err.message);
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
   });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    erro: 'Eita Mainha... aí cabou!',
  });
};

module.exports = errorMiddleware;
