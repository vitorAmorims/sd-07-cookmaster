const jwt = require('jsonwebtoken');

const secret = 'ForaBolsonaro';

const userToken = (user) => {
  const { password, ...userWithoutPassword } = user; 

  const jwtConfig = {
    expiresIn: 60 * 5 * 10,
    algorithm: 'HS256',
  };
  
  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);
  return token;
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  userToken,
  verifyToken,
};
