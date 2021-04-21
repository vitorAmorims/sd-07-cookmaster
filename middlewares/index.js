const userDataValidation = require('./userDataValidation');
const checkDuplicate = require('./checkDuplicate');
const errorMiddleware = require('./errorMiddleware');
const checkLoginData = require('./checkLoginData');
const loginDataValidation = require('./loginDataValidation');
const recipeDtataValidation = require('./recipeDataValidation');

module.exports = {
  userDataValidation,
  checkDuplicate,
  errorMiddleware,
  checkLoginData,
  loginDataValidation,
  recipeDtataValidation,
};