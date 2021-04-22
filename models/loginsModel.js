const jwt = require('jsonwebtoken');

const secret = 'mysecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = (user) => {
  const objToken = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(objToken, secret, jwtConfig);
  return token;
};

module.exports = {
  newToken,
};