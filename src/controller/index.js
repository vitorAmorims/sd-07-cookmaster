const insertUserCtrl = require('./usersControllers');
const { getOneRecipeCtrl, getRecipesCtrl, insertRecipeCtrl } = require('./recipeController');
const loginCtrl = require('./loginCtrl');

module.exports = {
  getOneRecipeCtrl,
  getRecipesCtrl,
  insertRecipeCtrl,
  insertUserCtrl,
  loginCtrl,
};
