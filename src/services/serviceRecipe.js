const { ObjectId } = require('mongodb');

const modelRecipe = require('../models/modelRecipe');

const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';

const entriesVerification = (name, ingredients, preparation) => {
  if (name === undefined || ingredients === undefined || preparation === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    entriesVerification(name, ingredients, preparation);

    const newRecipe = await modelRecipe.createRecipe(
      name,
      ingredients,
      preparation,
      userId,
    );
    return newRecipe;
  } catch (error) {
    return error.message;
  }
};

const getAllRecipes = async () => {
  const allRecipes = await modelRecipe.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'recipe not found';
  }

  const recipe = await modelRecipe.getRecipeById(id);

  if (recipe === null) {
    return 'recipe not found';
  }

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await modelRecipe.updateRecipe(
    id,
    name,
    ingredients,
    preparation,
  );
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await modelRecipe.deleteRecipe(id);
  return deletedRecipe;
};

const pictureUpload = async (id, path) => {
  await modelRecipe.pictureUpload(id, path);
  const recipe = await modelRecipe.getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  pictureUpload,
};
