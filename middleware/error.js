const CODES = require('../configurations/statusCodes');

module.exports = (err, _req, res, _next) => {
  console.error(`Erro: ${err.message}`);

  const status = err.status ? err.status : CODES.INTERNAL_SERVER_ERROR;
  return res.status(status).json({ message: err.message });
};