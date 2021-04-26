const validateObligatoryFields = require('./validateObligatoryFields');
const validateUniqueEmail = require('./validateUniqueEmail');
const validateObligatoryLoginFields = require('./validateObligatoryLoginFields');
const validateLogin = require('./validateLogin');
const validateRecipes = require('./validateRecipes');
const validateToken = require('./validateToken');

module.exports = {
  validateUniqueEmail,
  validateObligatoryFields,
  validateObligatoryLoginFields,
  validateLogin,
  validateRecipes,
  validateToken,
};
