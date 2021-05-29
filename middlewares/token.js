const jwt = require('jsonwebtoken');
const usersModel = require('../models/userModel');

const secret = 'abc';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded.data[1]);
    const user = await usersModel.findEmail(decoded.data[1]);
    if (!user) return res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    req.user = user;
    next();
    } catch (error) {
    res.status(401).json({ message: error.message });
    }
};

module.exports = validateToken;