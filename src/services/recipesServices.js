const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const invalidEntries = 'Invalid entries. Try again.';

const postRecipe = async (id, body) => {
  const { name, preparation, ingredients } = body;
  if (!name || !preparation || !ingredients) throw new Error(invalidEntries);
  const recipe = { ...body, userId: id };
  return recipesModel.createRecipe(recipe);
};

const getRecipes = async () => {
  const recipes = await recipesModel.searchAllRecipes(); 
  return recipes;
};

const getRecipe = async (userId) => {
  if (!ObjectId.isValid(userId)) throw new Error('recipe not found');
  const id = ObjectId(userId);
  const recipe = await recipesModel.searchById(id);
  if (!recipe) throw new Error('recipe not found');
  return recipe;
};

const editRecipe = async (recipeId, newRecipe, userId) => {
  const { name, preparation, ingredients } = newRecipe;
  if (!name || !preparation || !ingredients) throw new Error(invalidEntries);
  const modelReturn = await recipesModel.editRecipe(ObjectId(recipeId), newRecipe, userId);
  console.log({ service: modelReturn });
  return modelReturn;
};

const deleteRecipe = async (id) => {
  await recipesModel.deleteRecipe(ObjectId(id));
};

const uploadRecipeImage = async (id, url) => {
  const recipe = await recipesModel.uploadRecipeImage((ObjectId(id)), url);
  return recipe;
};

module.exports = {
  postRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  uploadRecipeImage,
};
