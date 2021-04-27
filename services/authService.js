const jwt = require('jsonwebtoken');

const secret = 'abc';

const generateAuthToken = (_id, email, role) => {
  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };
  
  const payload = {
    _id,
    email,
    role,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  generateAuthToken,
};
