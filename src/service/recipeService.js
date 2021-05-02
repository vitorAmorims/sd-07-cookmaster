const recipeModels = require('../models/recipeModels');

const createRecipe = async (name, ingredients, preparation, id) => {
    // console.log(name);
  const response = await recipeModels.createRecipe(name, ingredients, preparation, id);
  return response;
};

const getRecipes = async () => {
  const response = await recipeModels.getRecipes();
  return response;
};

const getRecipeById = async (id) => {
  const recipe = await recipeModels.getRecipesById(id);
  return recipe;
};

module.exports = { createRecipe, getRecipes, getRecipeById };
