const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const modelUser = require('../models/users');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const ERROR = 401;
    return res.status(ERROR).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, authConfig.secret);
    const user = await modelUser.getById(decoded.id);
    if (!user) {
      const ERROR = 401;
      res.status(ERROR).json({ message: 'missing auth token' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
