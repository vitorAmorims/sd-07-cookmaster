const jwt = require('jsonwebtoken');

const secret = 'EraUmaVezUmaSenha';

const generateToken = ({ email, role, _id }) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  return jwt.sign(
    { payload: { email, role, id: _id } },
    secret,
    jwtConfig,
  );
};

const verifyToken = (token) => {
  const isValid = jwt.verify(token, secret);
  if (isValid) return true;
};

module.exports = { generateToken, verifyToken };