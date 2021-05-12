const errorMiddleware = (err, _request, response, _next) => response.status(err.status).send({
  message: err.message,
});

module.exports = errorMiddleware;
