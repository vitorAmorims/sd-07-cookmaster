/** @format */

const { createUsers } = require('./userController');
const { login } = require('./loginController');
const { UpImage } = require('./imageController');
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
  UpImage,
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
};
