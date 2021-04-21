const recipesModels = require('../models/recipesModels');
const status = require('../config/statusTable');

const validateData = (ingredients, preparation, name) => {
  if (!ingredients || !preparation || !name) return false;
  return true;
};

const newRecipeValidation = async (id, name, ingredients, preparation) => {
  if (!validateData(ingredients, preparation, name)) {
    return { message: 'Invalid entries. Try again.', code: status.badRequest };
  }
  const newRecipe = await recipesModels.addRecipe(id, name, ingredients, preparation);
  return newRecipe;
};

const getRecipesValidation = async () => {
  const recipes = await recipesModels.getRecipes();
  return recipes;
};

const recipeByIdValidation = async (id) => {
  const recipe = await recipesModels.getRecipeById(id);
  if (!recipe) return { message: 'recipe not found', code: status.notFound };
  return recipe;
};

module.exports = {
  newRecipeValidation,
  getRecipesValidation,
  recipeByIdValidation,
};