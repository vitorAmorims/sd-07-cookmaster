const jwt = require('jsonwebtoken');
const userModel = require('../Model/user');

const secret = require('../config/secret');

const invalidTokenMessage = { message: 'jwt malformed' };
const teste = { message: 'missing auth token' };
const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json(teste);
    const decoded = jwt.verify(token, secret);
    const user = await userModel.getByEmail(decoded.email);
    if (!await user) return res.status(401).json(invalidTokenMessage);
    if (decoded.password !== user.password) return res.status(401).json(invalidTokenMessage);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(invalidTokenMessage);
  }
};

module.exports = validateTokenMiddleware;