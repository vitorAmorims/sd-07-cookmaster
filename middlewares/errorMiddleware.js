const { SERVER_ERROR } = require('../httpStatusCodes');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  console.log(err.message);
  if (err.status) {
    res.status(err.status).send({
      error: err.message,
    });
  }

  res.status(SERVER_ERROR).send({
    error: err.message,
  });
};

module.exports = errorMiddleware;