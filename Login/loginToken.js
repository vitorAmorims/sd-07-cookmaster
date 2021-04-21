const jwt = require('jsonwebtoken');

const secret = 'TokenDoProjetoCookmaster';

const createToken = (user) => {
  const jwtConfig = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  const { _id, email, role } = user;

  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);

  return token;
}; // req. 2

module.exports = {
  createToken,
};
