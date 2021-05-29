const recipeModel = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation, id) => {
  const newUser = await recipeModel.createRecipe(name, ingredients, preparation, id);
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

const updateRecipe = async ({ id, reqBody }) => {
  const updatedRecipe = await recipeModel.updateRecipe({ id, reqBody });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  await recipeModel.deleteRecipe(id);
};

const addImageRecipe = async (id, image) => {
  const recipeWithImage = await recipeModel.addImage(id, image);
  return recipeWithImage;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImageRecipe,
};
