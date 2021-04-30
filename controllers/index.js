/** @format */

const { createUsers, createAdmin } = require('./userController');
const { login } = require('./loginController');
const { upImageController } = require('./imageController');
const {
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
} = require('./recipeController');

module.exports = {
  createUsers,
  login,
  createAdmin,
  upImageController,
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
};
