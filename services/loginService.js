const validateLogin = require('./validateLogin');

module.exports = (email, password) => {
  validateLogin.passwordValidation(password);
  validateLogin.emailValidation(email);
  validateLogin.emailFormatValidation(email);
};
