const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const secret = 'hakunamatata';

const loginUser = async (req, res, next) => {
  const token = req.header.authorization;

  if (!token) {
    return res.status(401).json({ error: 'token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const login = await model.getUserEmail(decoded.data.email);

    if (!login) {
      return res.status(401).json({ message: 'Token error.' });
    }
    req.user = login;
    next();
  } catch (error) {
    return res.statu(401).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
};
