module.exports = (error, req, res, _next) => res
  .status(error.code)
  .json({ error: error.message });
