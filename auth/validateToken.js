const jwt = require('jsonwebtoken');
const key = require('./key');

const tokenIsValid = (token) => {
  try {
    jwt.verify(token, key);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { tokenIsValid };
