const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModels');

const secret = 'senha';
const message = { message: 'jwt malformed' };
const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json(message);
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await userModel.getUserByEmail(decoded.data.email);
    if (!user) {
      return res.status(401).json(message);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validToken;
