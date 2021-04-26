const errorMiddleware = (err, _req, res, _next) => {
    const InternalServerError = 500;
    const { status, message } = err;
    if (status) {
      return res.status(status).json({
        message,
      });
    }
    return res.status(InternalServerError).json({ message });
  };

  module.exports = errorMiddleware;