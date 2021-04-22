module.exports = (error, _req, res, _next) => {
  const { status, err, message } = error;
  console.log('ERROR @ errMiddleware', err);
  return res.status(status).json({ message });
};
