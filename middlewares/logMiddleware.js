const logMiddleware = (req, _res, next) => {
  console.log(`${req.method}: ${req.path}`);
  // console.table(req.body);
  next();
};

module.exports = logMiddleware;
