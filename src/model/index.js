const {
  getRecipes,
  getRecipeById,
  insertRecipe,
  updateRecipe,
} = require('./recipeModel');
const { getUserByEmail, getUserById, insertUser } = require('./userModel');

module.exports = {
  getRecipes,
  getRecipeById,
  getUserByEmail,
  getUserById,
  insertUser,
  insertRecipe,
  updateRecipe,
};
