const recipeModel = require('../models/recipeModel');
const { status } = require('../helpers');
// const { errorMessages, validEmailFormat } = require('../helpers');

const getAllRecipesService = async () => {
  const result = await recipeModel.getAllRecipesModel();
  return result;
};

const getRecipeByIdService = async (id) => {
  const result = await recipeModel.getRecipeByIdModel(id);
  if (!result) {
    return {
      isError: true,
      status: status.NOT_FOUND,
      message: 'recipe not found',
    };
  }
  return result;
};

const validRecipeService = async (name, ingredients, preparation, user) => {
  const { _id: userId } = user;
  const result = await recipeModel.createRecipeModel(name, ingredients, preparation, userId);
  return result;
};

const updateRecipeByIdService = async (id, data, user) => {
  const { _id: userId } = user;
  const verifyId = await recipeModel.getRecipeByIdModel(id);
  if (!verifyId) {
    return {
      isError: true,
      status: status.NOT_FOUND,
      message: 'Recipe not Found',
    };
  }
  if (user.role !== 'admin' && userId.toString() !== verifyId.userId.toString()) {
    return {
      isError: true,
      status: status.UNAUTHORIZED,
      message: 'Você não é admin coroio',
    };
  }
  const result = await recipeModel.updateRecipeByIdModel(id, data, userId);
  return result;
};
/*   console.log('conse log do verify', verifyId.userId);
  console.log('console log do user data', user._id); */

const deleteRecipeByIdService = async (id, user) => {
  const { _id: userId } = user;
  const verifyId = await recipeModel.getRecipeByIdModel(id);
  if (!verifyId) {
    return {
      isError: true,
      status: status.NOT_FOUND,
      message: 'Recipe not Found',
    };
  }
  if (user.role !== 'admin' && userId.toString() !== verifyId.userId.toString()) {
    return {
      isError: true,
      status: status.UNAUTHORIZED,
      message: 'Você não é admin coroio',
    };
  }
  const result = await recipeModel.deleteRecipeByIdModel(id);
  return result;
};

module.exports = {
  validRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
};
