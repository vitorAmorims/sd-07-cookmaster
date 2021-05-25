const validateLogin = require('./validateLogin');
// const statusMessages = require('../utils/statusMessages');

module.exports = (email, password) => {
  validateLogin.passwordValidation(password);
  validateLogin.emailValidation(email);
  validateLogin.emailFormatValidation(email);
  console.log('format'); //
};
