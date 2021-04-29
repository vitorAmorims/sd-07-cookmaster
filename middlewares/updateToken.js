const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/users');

const secret = 'cookmasterfivestarsmichelin';

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(authorization, secret);
    console.log(decoded);
  
    const user = await findUserByEmail(decoded.email);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
}
};

module.exports = validateToken;