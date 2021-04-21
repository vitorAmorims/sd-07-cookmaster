const jwt = require('jsonwebtoken');
require('dotenv').config();

const UsersModel = require('../models/usersModel');
const status = require('../httpStatusCodes');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(status.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const userData = jwt.verify(authorization, process.env.secret);

    const user = await UsersModel.findUserByEmail(userData.email);

    req.user = user;

    next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;