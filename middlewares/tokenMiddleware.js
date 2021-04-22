const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const { Unauthorized } = require('../config/statusCode');

const { JWT_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(Unauthorized).json({ message: 'missing auth token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await usersModel.getUserEmail(decoded.email);

    req.user = user;
    next();
  } catch (err) {
    return res.status(Unauthorized).json({ message: err.message });
  }
};

module.exports = validateToken;