const validationName = require('./validationName');
const validationEmail = require('./validationEmail');
const validationEmailCreate = require('./validationEmailCreate');
const validationPassword = require('./validationPassword');
const validationPasswordLogin = require('./validPassForLogin');
const validationRecipes = require('./validationRecipes');
const validationToken = require('./validationToken');
const recipeIdNotFound = require('./recipeNotFound');

module.exports = {
  validationName,
  validationEmail,
  validationEmailCreate,
  validationPassword,
  validationPasswordLogin,
  validationRecipes,
  validationToken,
  recipeIdNotFound,
};
