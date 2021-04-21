const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign(
  {
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }, secret,
  jwtConfig,
);

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
      return null;
  }
};

module.exports = { generateToken, decodeToken };