const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ data: user }, secret, jwtConfig);

module.exports = { generateToken };