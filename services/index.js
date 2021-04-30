/** @format */

const { createUser, getEmailUser } = require('./userService');
const { getLogin } = require('./loginService');
const { imageService } = require('./imageService');
const { uploadImage } = require('./uploadImageService');
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
  imageService,
  uploadImage,
  createRecipes,
  getRecipes,
  getIdRecipes,
  upRecipes,
  deleteRecipes,
};
