const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const { secret } = require('./secret.json');

const JWT_MALFORMED = 'jwt malformed';
module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.getByEmail(decoded.email);

    if (!user) {
      return res.status(401).json({ message: JWT_MALFORMED });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: JWT_MALFORMED });
  }
};