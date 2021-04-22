const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const code = require('../utils/code');
const msg = require('../utils/msg');

const secret = 'cookmastersecret';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(code.UNAUTHORIZED).json(msg.missAuth);

  try {
    const decoded = jwt.verify(token, secret);
    
    const user = await User.getByEmail(decoded.data);
    if (!user) return res.status(code.UNAUTHORIZED).json(msg.wrongToken);
    req.user = user;
    next();
  } catch (error) {
    return res.status(code.UNAUTHORIZED).json(msg.wrongToken);
  }
};

module.exports = validateToken;
