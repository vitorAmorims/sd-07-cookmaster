const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const error = require('../errors');

const secret = 'mysecretdetoken';

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw error.missingToken;
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findUserByEmail(decoded.data.email);
    if (!user) {
      return res
        .status(error.invalidToken.code)
        .json(error.invalidToken.message);
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(err.code || 401).json({
      message: err.message,
    });
  }
};

module.exports = authorization;
