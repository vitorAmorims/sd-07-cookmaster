const jwt = require('jsonwebtoken');

const secret = '01a6fe873b1789a';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  getTokenByUser: (user) => jwt.sign({ user }, secret, jwtConfig),
  validateToken: (token) => jwt.verify(token, secret),
};
