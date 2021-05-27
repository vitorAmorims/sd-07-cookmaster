const recipeModel = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation) => {
  const newUser = await recipeModel.createRecipe(name, ingredients, preparation);
  return newUser;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
    return recipes;
};

const getRecipeById = async (id) => {
  const recipes = await recipeModel.getRecipeById(id);
    return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
