const jwt = require('jsonwebtoken');
const usersModel = require('../models/userModel');

const secret = 'abc';
const userMessage = { message: 'Erro ao procurar usuario do token.' };
const tokenMessage = { message: 'missing auth token' };

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json(tokenMessage);
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findEmail(decoded.data[1]);
    if (!user) return res.status(401).json(userMessage);
    req.user = user;
    next();
    } catch (error) {
    res.status(401).json({ message: error.message });
    console.log(error.message);
    }
};

module.exports = validateToken;