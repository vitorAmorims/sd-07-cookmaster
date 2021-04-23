const logMiddleware = (req, res, next) => {
  console.log(`Verbo:rota ${req.method}: ${req.path}`);
  next();
};

module.exports = logMiddleware;