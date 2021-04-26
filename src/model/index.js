const { getRecipes, insertRecipe } = require('./recipeModel');
const { getUserByEmail, getUserById, insertUser } = require('./userModel');

module.exports = {
  getRecipes,
  getUserByEmail,
  getUserById,
  insertUser,
  insertRecipe,
};
