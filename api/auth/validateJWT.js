const jwt = require('jsonwebtoken');
const model = require('../../models/users');

const secret = 'mypass';
const errorToken = 'jwt malformed';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await model.getEmail(decoded.data.email);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: errorToken });
  }
};