const { status } = require('../helpers');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({

    error: 'Deu ruim...',
  });
};

module.exports = errorMiddleware;
