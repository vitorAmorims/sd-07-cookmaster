const jwt = require('jsonwebtoken');

const secret = 'EraUmaVezUmaSenha';

const generateToken = ({ email, password }) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  return jwt.sign(
    { user: { email, password } },
    secret,
    jwtConfig,
  );
};

module.exports = { generateToken };