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
  const userId = user._id;
  const result = await recipeModel.createRecipeModel(name, ingredients, preparation, userId);
  return result;
};

const updateRecipeByIdService = async (id, data, user) => {
  const verifyId = await recipeModel.getRecipeByIdModel(id);
  if (!verifyId) {
    return {
      isError: true,
      status: status.NOT_FOUND,
      message: 'Recipe not Found',
    };
  }
  if (user.role !== 'admin' && user._id.toString() !== verifyId.userId.toString()) {
 return {
      isError: true,
      status: status.UNAUTHORIZED,
      message: 'Você não é admin coroio',
    }; 
}
  const result = await recipeModel.updateRecipeByIdModel(id, data, user);
  console.log(result);
  return result;
};
/*   console.log('conse log do verify', verifyId.userId);
  console.log('console log do user data', user._id); */

module.exports = {
  validRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
};
