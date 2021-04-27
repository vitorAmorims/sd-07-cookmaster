const { createRecipe } = require('../models/recipes');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new Error('Invalid entries. Try again.');
  }
  return null;
};

const createRecipeService = async (recipe, payload) => {
  const { name, ingredients, preparation } = recipe;
  validateRecipe(name, ingredients, preparation);

  const createdRecipe = createRecipe(recipe, payload);
  return createdRecipe;
};

module.exports = {
  createRecipeService,
};