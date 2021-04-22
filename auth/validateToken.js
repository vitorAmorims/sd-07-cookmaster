const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
// require('dotenv').config();

const MissingTokenError = require('../errors/MissingTokenError');
const MalformedToken = require('../errors/MalformedToken');
const UsersModel = require('../models/usersModel');

const validateToken = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  const secret = 'anySecretWorks';

  if (!authorization) {
    throw new MissingTokenError();
  }

  const userData = jwt.verify(authorization, secret);

  const user = await UsersModel.findUserByEmail(userData.email);

  if (!user) {
    throw new MalformedToken();
  }

  req.user = user;

  next();
});

module.exports = validateToken;