const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, id) => {
const newRecipe = await recipesModel.createRecipe(name, ingredients, preparation, id);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
    return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
    return recipe;
};

const updateRecipe = async ({ id, reqBody }) => {
  const updatedRecipe = await recipesModel.updateRecipe({ id, reqBody });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  await recipesModel.deleteRecipe(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
