const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const error = require('../errors');

const secret = 'mysecretdetoken';

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw error.invalidToken;

    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findUserByEmail(decoded.data.email);

    if (!user) throw error.invalidToken;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ 
      message: 'jwt malformed',
    });
  }
};

module.exports = authorization;