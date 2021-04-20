module.exports = (err, _req, res, _next) => {
  const serverError = 500;
  res.status(serverError).send({ error: `${err.message}` });
};
