const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const MissingTokenError = require('../errors/MissingTokenError');
const UsersModel = require('../models/usersModel');

const validateToken = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  const secret = 'anySecretWorks';

  if (!authorization) {
    throw new MissingTokenError();
  }

  const userData = jwt.verify(authorization, secret);

  const user = await UsersModel.findUserByEmail(userData.email);

  req.user = user;

  next();
});

module.exports = validateToken;