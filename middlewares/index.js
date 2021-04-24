const errorMiddleware = require('./errorMiddleware');
const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');

module.exports = {
  errorMiddleware,
  validateUser,
  validateLogin,
};