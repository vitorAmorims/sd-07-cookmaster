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

const isAdmin = (token) => {
  const { role } = jwt.verify(token, key);
  if (role === 'admin') return true;
  return false;
};

module.exports = {
  tokenIsValid,
  isAdmin,
};
