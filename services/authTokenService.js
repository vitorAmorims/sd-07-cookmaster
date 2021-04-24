const jwt = require('jsonwebtoken');

const generateAuthToken = (id, email, role = 'user', password) =>
  jwt.sign({ id, email, role }, password);

const tokenIsValid = (token, password) => {
  try {
    jwt.verify(token, password);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { generateAuthToken, tokenIsValid };