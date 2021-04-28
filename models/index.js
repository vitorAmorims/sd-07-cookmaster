const {
  createNewUser,
  getByEmailAndPassword,
} = require('./usersModel');

const {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  getUserIdByRecipeId,
  uploadImage,
} = require('./recipesModel');

const { getImageByName } = require('./imagesModel');

module.exports = {
  createNewUser,
  getByEmailAndPassword,
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  getUserIdByRecipeId,
  uploadImage,
  getImageByName,
};