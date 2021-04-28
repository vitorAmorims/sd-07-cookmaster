const insertUserCtrl = require('./usersControllers');
const {
  delOneRecipeCtrl,
  editRecipeCtrl,
  getOneRecipeCtrl,
  getRecipesCtrl,
  insertRecipeCtrl,
} = require('./recipeController');
const loginCtrl = require('./loginCtrl');

module.exports = {
  delOneRecipeCtrl,
  editRecipeCtrl,
  getOneRecipeCtrl,
  getRecipesCtrl,
  insertRecipeCtrl,
  insertUserCtrl,
  loginCtrl,
};
