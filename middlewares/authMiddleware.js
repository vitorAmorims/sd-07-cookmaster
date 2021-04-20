const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const { errorMessages } = require('../helpers');

const secret = 'xablau';

const authMiddleware = async (req, _res, next) => {
  const token = req.headers['authorization'];

  if (!token) return next(errorMessages.JWT_MALFORMED);

  try {
    const decoded = jwt.verify(token, secret);

    const user = await userModel.getUserByEmail(decoded.data.email);
    if (!user) return next(errorMessages.INCORRECT_USERNAME_OR_PASSWORD);
 
    req.user = user;

    next();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = authMiddleware;