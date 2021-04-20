const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const status = require('../config/statusTable');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.unauthorized).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.data = decoded;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(status.unauthorized).json({ message: 'jwt malformed' });
  }
};