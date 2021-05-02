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
  const idNotFound = 'recipe not found';
  if (typeof id !== 'string') throw new Error(idNotFound);
  
  const response = await recipeModels.getRecipesById(id);
  if (!response) throw new Error(idNotFound);

  return response;
};

module.exports = { createRecipe, getRecipes, getRecipeById };
