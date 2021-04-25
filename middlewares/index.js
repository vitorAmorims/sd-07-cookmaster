const validateObligatoryFields = require('./validateObligatoryFields');
const validateUniqueEmail = require('./validateUniqueEmail');
const validateObligatoryLoginFields = require('./validateObligatoryLoginFields');
const validateLogin = require('./validateLogin');

module.exports = {
  validateUniqueEmail,
  validateObligatoryFields,
  validateObligatoryLoginFields,
  validateLogin,
};
