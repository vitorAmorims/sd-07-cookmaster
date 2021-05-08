const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const secret = 'hakunamatata';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });
  if (!token) return res.status(401).json({ message: 'token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    const login = await model.getUserEmail(decoded.data.email);

    if (!login) {
      return res.status(401).json({ message: 'Token error.' });
    }
    req.user = login;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
