const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// require('dotenv').config();

const MissingTokenError = require('../errors/MissingTokenError');
const UsersModel = require('../models/usersModel');
const status = require('../httpStatusCodes');

const validateToken = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  const secret = 'anySecretWorks';

  if (!authorization) {
    throw new MissingTokenError();
  }

  try {
    const userData = jwt.verify(authorization, secret);

    const user = await UsersModel.findUserByEmail(userData.email);

    req.user = user;

    next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
});

module.exports = validateToken;