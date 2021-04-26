const errorMiddleware = require('./error');
const CustomError = require('./CustomError');
const validateToken = require('./validateToken');
const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');

module.exports = {
  CustomError,
  errorMiddleware,
  validateToken,
  validateUser,
  validateLogin,
};