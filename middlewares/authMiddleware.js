const jwt = require('jsonwebtoken');

const JWT_SECRET = 'meuSegredo';

const loginModel = require('../model/loginModel');

const authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const token = req.headers.authorization;
  if (await loginModel.login(email, password)) {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  }
  return next();
};

module.exports = authMiddleware;
