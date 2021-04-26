const errorMiddleware = (err, req, res, next) => {
  if (err) {
    return res.status(500).send(
        { error: `Something is wrong! ERROR: ${err.message}` },
    );
  }

  next();
};

module.exports = errorMiddleware;
