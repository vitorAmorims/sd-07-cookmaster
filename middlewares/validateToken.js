const jwt = require('jsonwebtoken');
const userModel = require('../Model/user');
const { secret } = require('../config/jwtConfig');
const { UNAUTHORIZED, invalidTokenMessage, missingToken } = require('./errorMessagesAndCodes');

const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw missingToken;

    const decoded = jwt.verify(token, secret);
    const user = await userModel.getByEmail(decoded.email);

    if (!await user) throw invalidTokenMessage;
    if (decoded.password !== user.password) throw invalidTokenMessage;

    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json(error);
  }
};

module.exports = validateTokenMiddleware;