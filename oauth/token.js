const jwt = require('jsonwebtoken');

const secret = 'minhasenha';

const jwtConfig = {
  expiresIn: 3000,
  algorithm: 'HS256',
};

const token = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = token;
