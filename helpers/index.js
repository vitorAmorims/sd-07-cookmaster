const validEmailFormat = require('./validEmailFormat');
const validName = require('./validName');
const validPassword = require('./validPassword');
const validEmailExist = require('./validEmailExist');
const validUserLogin = require('./validLogin');
const validIngredients = require('./validIngredients');
const validPreparation = require('./validPreparation');
const validUpdateRecipes = require('./validUpdateRecipes');
const validUploadImageRecipe = require('./validUploadImages');
const status = require('./statusCodes');

module.exports = {
  validEmailFormat,
  validName,
  validPassword,
  validEmailExist,
  validUserLogin,
  validIngredients,
  validPreparation,
  validUpdateRecipes,
  validUploadImageRecipe,
  status,
};
