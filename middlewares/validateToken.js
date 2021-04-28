const jwt = require('jsonwebtoken');
const { getUserEmail } = require('../models/UsersModel');

const secret = 'ninguemiraadvinharessasenhatoda';

const UNAUTHORIZED = 401;

const validateTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'jwt must be provided' });
  
  try {
    const decode = jwt.verify(token, secret);
    const user = await getUserEmail(decode.email);
    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = validateTokenMiddleware;
