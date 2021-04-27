const { createRecipe,
  getAllRecipes,
} = require('../models/recipes');

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

const getAllRecipesService = async () => {
  const listOfRecipes = await getAllRecipes();

  return listOfRecipes;
};

module.exports = {
  createRecipeService,
  getAllRecipesService,
};