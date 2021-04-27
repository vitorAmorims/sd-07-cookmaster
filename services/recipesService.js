const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const Validations = require('../helpers/validations');
const AuthValidations = require('../helpers/authValidations');
const CustomError = require('../helpers/customError');

const createNewRecipes = async (authorization, name, ingredients, preparation) => {
  const { error } = Validations.isRecipesValid({ name, ingredients, preparation });
  if (error) {
    throw new CustomError(CODES.BAD_REQUEST, error.message);
  }

  let user;
  
  try {
    user = await AuthValidations.validateToken(authorization);
  } catch (e) {
    throw new CustomError(CODES.UNAUTHORIZED, 'jwt malformed');
  }
  try {
    const newRecipe = await Models.createNewRecipes(name, ingredients, preparation, user.userId);
    return { recipe: newRecipe.ops[0] };
  } catch (err) {
    throw new Error('Error to create new recipe');
  }
};

const getAllRecipes = async () => (Models.getAllRecipes());

module.exports = {
  createNewRecipes,
  getAllRecipes,
};
