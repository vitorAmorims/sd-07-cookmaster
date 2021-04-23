const { ObjectID } = require('mongodb');
const { recipesModel, usersModel } = require('../models');
const { create, readAll, readById, updateById, deleteById } = recipesModel;

const { NOT_FOUND } = require('../status');

const validateCreateRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation)
    throw new Error('Invalid entries. Try again.');

  const newRecipe = await create(name, ingredients, preparation, userId);
  if (!newRecipe.result.ok) throw new Error('Error validateCreateRecipe');

  return { _id: newRecipe.insertedId, name, ingredients, preparation, userId };
};

const validateReadAllRecipes = async () => {
  const recipes = await readAll();
  if (!recipes) throw new Error('Error validateReadyAllRecipes');
  return recipes;
};

const validateReadById = async id => {
  if (!ObjectID.isValid(id))
    return { status: NOT_FOUND, message: 'recipe not found' };
  const recipe = await readById(id);
  if (!recipe) throw new Error('Error validateReadById');
  return recipe;
};

const validateUpdateRecipeById = async (
  id,
  name,
  ingredients,
  preparation,
  userId,
) => {
  if (!ObjectID.isValid(id))
    return { status: NOT_FOUND, message: 'recipe not found' };

  if (!name || !ingredients || !preparation)
    throw new Error('Invalid entries. Try again.');

  const user = await usersModel.readById(userId);
  // console.log(user);

  if (!user) throw new Error('userId did not registered');

  const newRecipe = await updateById(
    id,
    name,
    ingredients,
    preparation,
    userId,
  );
  if (!newRecipe.result.ok) throw new Error('Error validateUpdateRecipeById');

  return { _id: id, name, ingredients, preparation, userId };
};

const validateDeleteRecipeById = async id => {
  if (!ObjectID.isValid(id))
    return { status: NOT_FOUND, message: 'recipe not found' };

  const recipe = await deleteById(id);
  if (!recipe.result.ok) throw new Error('Error validateDeleteRecipeById');
};

module.exports = {
  validateCreateRecipe,
  validateReadAllRecipes,
  validateReadById,
  validateUpdateRecipeById,
  validateDeleteRecipeById,
};
