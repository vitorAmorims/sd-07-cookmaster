const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const Validations = require('../helpers/validations');
const AuthValidations = require('../helpers/authValidations');
const CustomError = require('../helpers/customError');

const NOT_FOUND_MESSAGE = 'recipe not found';

const createNewRecipes = async (authorization, name, ingredients, preparation) => {
  const { error } = Validations.isRecipesValid({ name, ingredients, preparation });
  if (error) {
    throw new CustomError(CODES.BAD_REQUEST, error.message);
  }
  
  let user;
  try {
    user = await AuthValidations.userAutorization(authorization);
  } catch (e) {
    throw new CustomError(e.status, e.message);
  }
  
  try {
    const newRecipe = await Models.createNewRecipes(name, ingredients, preparation, user.userId);
    return { recipe: newRecipe.ops[0] };
  } catch (err) {
    throw new Error('Error to create new recipe');
  }
};

const getAllRecipes = async () => (Models.getAllRecipes());

const getRecipesById = async (id) => {
  if (!AuthValidations.isIdValid(id)) {
    throw new CustomError(CODES.NOTFOUND, NOT_FOUND_MESSAGE);
    // throw new CustomError(CODES.UNAUTHORIZED, 'Recipe Id invalid');
  }
  try {
    return await Models.getRecipesById(id);
  } catch (error) {
    throw new CustomError(CODES.NOTFOUND, NOT_FOUND_MESSAGE);
  }
};

const updateRecipesById = async (authorization, recipeObj) => {
  const { id, name, ingredients, preparation } = recipeObj;
  if (!AuthValidations.isIdValid(id)) {
    throw new CustomError(CODES.UNAUTHORIZED, 'Recipe Id invalid');
  }
  let userId;
  try {
    const user = await AuthValidations.userAutorization(authorization, id);
    userId = user.userId;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }

  const recipe = await Models.updateRecipesById({ id, name, ingredients, preparation, userId });
  if (!recipe.lastErrorObject.updatedExisting) {
    throw new CustomError(CODES.NOTFOUND, NOT_FOUND_MESSAGE);
  }
  return recipe.value;
};

const deleteRecipesById = async (authorization, id) => {
  if (!AuthValidations.isIdValid(id)) {
    throw new CustomError(CODES.UNAUTHORIZED, 'Recipe Id invalid');
  }

  try {
    await AuthValidations.userAutorization(authorization, id);
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }

  const recipe = await Models.deleteRecipesById(id);
  if (!recipe) {
    throw new CustomError(CODES.NOTFOUND, NOT_FOUND_MESSAGE);
  }
};

const uploadImage = async (authorization, id, imageName) => {
  try {
    await AuthValidations.userAutorization(authorization, id);
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }

  const result = await Models.uploadImage(id, imageName);
  if (!result.lastErrorObject.updatedExisting) {
    throw new CustomError(CODES.INTERNAL_SERVER_ERROR, 'Error uploading image');
  }
  return result.value;
};

module.exports = {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
};
