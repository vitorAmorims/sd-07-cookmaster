const {
  createNewUser,
} = require('./usersController');

const {
  login,
} = require('./loginController');

const {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  uploadImage,
  deleteRecipesById,
} = require('./recipesController.js');

const {
  getImageByName,
} = require('./imageController');

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