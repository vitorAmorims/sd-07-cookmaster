const { users } = require('./usersController');
const { login } = require('./loginController');
const {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage } = require('./recipesController');

module.exports = {
  users,
  login,
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
