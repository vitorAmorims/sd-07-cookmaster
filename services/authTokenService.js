const jwt = require('jsonwebtoken');

const secret = '123';

const generateAuthToken = (id, email, role = 'user') => {
  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };
  const token = jwt.sign({ id, email, role }, secret, jwtConfig);
  return token;
};

module.exports = { generateAuthToken };