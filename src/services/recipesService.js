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
  const recipe = await recipesModel.getRecipeById(id);

  if (recipe === null) {
    return 'recipe not found';
  }

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await recipesModel.updateRecipe(id, name, ingredients, preparation);
  return updatedRecipe;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe };
