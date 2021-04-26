const errorMiddleware = (err, _req, res, next) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    next();
};

module.exports = errorMiddleware;