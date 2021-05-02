const jwt = require('jsonwebtoken');

const secret = 'minhasenha';

const jwtConfig = {
  expiresIn: 60,
  algorithm: 'HS256',
};

const token = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = token;
