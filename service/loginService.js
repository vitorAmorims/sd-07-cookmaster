const jwt = require('jsonwebtoken');
const { getUserEmail } = require('../models/usersModels');
const secret = require('../config/secret');

const tokenGeneration = async (email) => {
  const user = await getUserEmail(email);
  const { _id, role } = user;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return token;
};

module.exports = {
  tokenGeneration,
};
