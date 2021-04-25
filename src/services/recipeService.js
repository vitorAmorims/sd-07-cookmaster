const { recipeModel } = require('../models');

const createRecipe = async (recipe) => {
  const { name, preparation, ingredients, userId } = recipe;
  const recipeRes = recipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipeRes;
};

const getRecipes = async () => {
  const recipeRes = recipeModel.getRecipes();
  return recipeRes;
};

const getRecipeById = async (id) => {
  const recipeRes = recipeModel.getRecipeById(id);
  return recipeRes;
};

const updateRecipe = async (id, recipe) => {
  console.log('recipe', recipe);
  const { name, preparation, ingredients, userId } = recipe;
  const recipeRes = await recipeModel.updateRecipe(id, name, preparation, ingredients);
  console.log('recipes res', recipeRes);
  return { ...recipeRes, userId };
};

const deleteRecipe = async (id) => {
  const recipeRes = recipeModel.deleteRecipe(id);
  return recipeRes;
};

const uploadPhoto = async (id) => {
  await recipeModel.uploadPhoto(id);
  const recipeRes = await recipeModel.getRecipeById(id);
  return recipeRes;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadPhoto,
};
