const insertUserCtrl = require('./usersControllers');
const {
  editRecipeCtrl,
  getOneRecipeCtrl,
  getRecipesCtrl,
  insertRecipeCtrl,
} = require('./recipeController');
const loginCtrl = require('./loginCtrl');

module.exports = {
  editRecipeCtrl,
  getOneRecipeCtrl,
  getRecipesCtrl,
  insertRecipeCtrl,
  insertUserCtrl,
  loginCtrl,
};
