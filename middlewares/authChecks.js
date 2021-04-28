const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'cookmaster';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'jwt malformed' });
  try {
    const decoded = jwt.verify(token, secret);
    // console.log(decoded);
    const user = await usersModel.getByEmail(decoded.data);
    // console.log(user);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }

  next();
};

module.exports = authMiddleware;