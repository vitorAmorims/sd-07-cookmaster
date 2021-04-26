const jwt = require('jsonwebtoken');
const Users = require('../models/usersModels');

const secret = '123';
const missingToken = { status: 401, message: 'missing auth token', code: 'invalid_data' };

const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) next(missingToken);
    const decoded = jwt.verify(token, secret);
    const user = await Users.findUser(decoded.email);
    req.user = user;
    return next();
  } catch (error) {
    if (error.message === 'missing auth token') {
      return next(missingToken);
    }
    return next({ status: 401, message: 'jwt malformed', code: 'invalid_data' });
  }
};

module.exports = authMiddleware;