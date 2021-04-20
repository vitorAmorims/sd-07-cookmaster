const userDataValidation = require('./userDataValidation');
const checkDuplicate = require('./checkDuplicate');
const errorMiddleware = require('./errorMiddleware');
const checkLoginData = require('./checkLoginData');
const loginDataValidation = require('./loginDataValidation');

module.exports = {
  userDataValidation,
  checkDuplicate,
  errorMiddleware,
  checkLoginData,
  loginDataValidation,
};