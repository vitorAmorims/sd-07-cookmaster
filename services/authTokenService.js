const jwt = require('jsonwebtoken');

const generateAuthToken = (id, email, role = 'user', password) =>
  jwt.sign({ id, email, role }, password);

module.exports = generateAuthToken;