// refatorei essa parte como sugestão do Igor G. no plantão do dia 23-04-2021
const generateToken = require('./generateToken');
const validateToken = require('./validateToken');
const getUserIDfromToken = require('./getUserIDfromToken');

module.exports = {
  generateToken,
  validateToken,
  getUserIDfromToken,
};