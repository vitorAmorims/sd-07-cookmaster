const {
  createNewUser,
} = require('./usersService');

const {
  login,
} = require('./loginService');

const {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
} = require('./recipesService');

const { getImageByName } = require('./imagesService');

module.exports = {
  createNewUser,
  login,
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
  getImageByName,
};