const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { code } = require('../config/statusTable');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  try {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  
    const decoded = jwt.verify(token, segredo);
    const { email, password } = decoded.data;
    const user = await User.login(email, password);
    if (!user) return res.status(code.unauthorized).json({ message: 'jwt malformed' });

    req.data = decoded.data;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
