const { ObjectId } = require('mongodb');

const recipesModel = require('../models/recipesModel');

// ----------------------------------------- Funções de verificação

const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';

// prettier-ignore
const verifyEntries = (name, ingredients, preparation) => {
  if (name === undefined || ingredients === undefined || preparation === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ------------------------------------------- Funções que chamam o model

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    verifyEntries(name, ingredients, preparation);

    const newRecipe = await recipesModel.createRecipe(
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
  const allRecipes = await recipesModel.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'recipe not found';
  }

  const recipe = await recipesModel.getRecipeById(id);

  if (recipe === null) {
    return 'recipe not found';
  }

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await recipesModel.updateRecipe(
    id,
    name,
    ingredients,
    preparation,
  );
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await recipesModel.deleteRecipe(id);
  return deletedRecipe;
};

const postPhoto = async (id, path) => {
  await recipesModel.postPhoto(id, path);
  const recipe = await recipesModel.getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  postPhoto,
};
