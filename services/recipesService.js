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

module.exports = {
  recipesRegistration,
};