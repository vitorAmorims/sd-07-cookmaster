const { users } = require('./usersController');
const { login } = require('./loginController');
const { addRecipe, getAllRecipes } = require('./recipesController');

module.exports = {
  users,
  login,
  addRecipe,
  getAllRecipes,
};
