const jwt = require('jsonwebtoken');
const key = require('./key');

const userID = (token) => {
  const { _id } = jwt.verify(token, key);
  return _id; 
};

module.exports = { userID };