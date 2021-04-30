/** @format */

const { createUser, getEmailUser, createAdmins } = require('./userService');
const { getLogin } = require('./loginService');
const { imageService, imageUploadService } = require('./imageService');
const {
  createRecipes,
  getRecipes,
  getIdRecipes,
  upRecipes,
  deleteRecipes,
} = require('./recipeService');

module.exports = {
  createUser,
  getEmailUser,
  getLogin,
  imageUploadService,
  imageService,
  createAdmins,
  createRecipes,
  getRecipes,
  getIdRecipes,
  upRecipes,
  deleteRecipes,
};
