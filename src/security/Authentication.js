const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  getTokenByUser: (user) => jwt.sign({ user }, secret, jwtConfig),
  getSecret: secret,
};
