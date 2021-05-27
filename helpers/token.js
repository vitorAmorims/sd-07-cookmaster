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
  console.log('isValid', isValid);
  console.log('payload', isValid.payload);
  return isValid.payload;
};

module.exports = { generateToken, verifyToken };