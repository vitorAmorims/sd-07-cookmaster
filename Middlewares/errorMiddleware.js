/** @format */

const { INTERNAL } = require('../CODE_ERROR');

async function errorMiddleware(err, _req, res, _next) {
  if (err.status) {
    res.status(err.status).send({ message: err.err });
  } else {
    return res.status(INTERNAL).send({ message: err.message });
  }
}

module.exports = { errorMiddleware };
