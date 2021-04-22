const recipesModel = require('../models/recipesModel');

// ----------------------------------------- Funções de verificação

const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';

const verifyEntries = (name, ingredients, preparation) => {
  if (name === undefined || ingredients === undefined || preparation === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ------------------------------------------- Funções que chamam o model

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    verifyEntries(name, ingredients, preparation);

    const newRecipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
    return newRecipe;
  } catch (error) {
    return error.message;
  }
};

module.exports = { createRecipe };
