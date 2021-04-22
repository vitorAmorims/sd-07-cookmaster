const errorMiddleware = (err, _req, _res, _next) => {
  console.log(err);
};

module.exports = errorMiddleware;