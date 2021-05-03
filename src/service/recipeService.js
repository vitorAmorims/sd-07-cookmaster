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
  const response = await recipeModels.getRecipesById(id);
  return response;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const response = await recipeModels.updateRecipe(id, name, ingredients, preparation);
  return response;
};

const deleteRecipe = async (id) => {
  const response = await recipeModels.deleteRecipe(id);
  return response;
};

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
