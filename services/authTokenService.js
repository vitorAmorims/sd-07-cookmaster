const jwt = require('jsonwebtoken');

const secret = '123';

const generateAuthToken = (id, email, role = 'user') =>
  jwt.sign({ id, email, role }, secret);

const tokenIsValid = (token) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { generateAuthToken, tokenIsValid };