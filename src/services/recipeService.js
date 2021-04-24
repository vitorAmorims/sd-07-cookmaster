const { ObjectID } = require('mongodb');
const { recipesModel } = require('../models');

const {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
  updateImageById,
} = recipesModel;

const { NOT_FOUND, throwError } = require('../helpers');

const codeException = { status: NOT_FOUND, message: 'recipe not found' };

const validateCreateRecipe = async (name, ingredients, preparation, userId) => {
  throwError(!ObjectID.isValid(userId), null, { status: NOT_FOUND, message: 'user not found' });
  throwError(!name || !ingredients || !preparation, 'Invalid entries. Try again.', null);

  const newRecipe = await create(name, ingredients, preparation, userId);
  throwError(!newRecipe.result.ok, 'Error validateCreateRecipe');

  return { _id: newRecipe.insertedId, name, ingredients, preparation, userId };
};

const validateReadAllRecipes = async () => {
  const recipes = await readAll();
  if (!recipes) {
    throw new Error('Error validateReadyAllRecipes');
  }
  return recipes;
};

const validateReadById = async (id) => {
  if (!ObjectID.isValid(id)) return codeException;

  const recipe = await readById(id);
  if (!recipe) {
    throw new Error('Error validateReadById');
  }
  return recipe;
};

const validateUpdateRecipeById = async (id, name,
  ingredients, preparation) => {
  throwError(!ObjectID.isValid(id), null, codeException);

  throwError(!name || !ingredients || !preparation, 'Invalid entries. Try again.', null);

  const newRecipe = await updateById(
    id, name, ingredients, preparation,
  );
  throwError(!newRecipe.result.ok, 'validateUpdateRecipeById', null);

  return { _id: id, name, ingredients, preparation };
};

const validateDeleteRecipeById = async (id) => {
  if (!ObjectID.isValid(id)) return codeException;

  const recipe = await deleteById(id);
  if (!recipe.result.ok) {
    throw new Error('Error validateDeleteRecipeById');
  }
};

const validateUpdateImageById = async (id, image, userId) => {
  if (!ObjectID.isValid(id)) return codeException;

  const recipe = await validateReadById(id);

  const newRecipe = await updateImageById(id, image, userId);
  if (!newRecipe.result.ok) throw new Error('Error validateUpdateImageById');

  return { _id: id, ...recipe, image };
};

module.exports = {
  validateCreateRecipe,
  validateReadAllRecipes,
  validateReadById,
  validateUpdateRecipeById,
  validateDeleteRecipeById,
  validateUpdateImageById,
};
