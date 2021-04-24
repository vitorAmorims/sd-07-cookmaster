const { CustomError, STATUS_CODE } = require('../helpers');
const { getUserIDfromToken } = require('../auth');
const { recipesModel } = require('../models');

const checkIfNameIngredientsAndPreparationExist = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
};

const recipesRegistration = async (auth, name, ingredients, preparation) => {
  checkIfNameIngredientsAndPreparationExist(name, ingredients, preparation);
  const userId = getUserIDfromToken.userID(auth);
  const result = await recipesModel.registerRecipe(userId, name, ingredients, preparation);
  return result;
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const checkRecipeByID = (result) => {
  if (result === null) {
    throw new CustomError({
      status: STATUS_CODE.NOT_FOUND,
      message: 'recipe not found',
    });
  }
};

const getRecipe = async (id) => {
  const result = await recipesModel.getRecipe(id);
  checkRecipeByID(result);
  return result;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const result = await recipesModel.updateRecipe(id, name, ingredients, preparation);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await recipesModel.deleteRecipe(id);
  return result;
};

module.exports = {
  recipesRegistration,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};