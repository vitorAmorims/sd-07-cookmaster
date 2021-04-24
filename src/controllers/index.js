const { users } = require('./usersController');
const { login } = require('./loginController');
const { addRecipe, getAllRecipes, getRecipeById } = require('./recipesController');

module.exports = {
  users,
  login,
  addRecipe,
  getAllRecipes,
  getRecipeById,
};
