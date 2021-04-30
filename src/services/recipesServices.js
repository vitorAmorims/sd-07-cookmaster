const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const postRecipe = async (id, body) => {
  const { name, preparation, ingredients } = body;
  console.log({ body, id });
  if (!name || !preparation || !ingredients) throw new Error('Invalid entries. Try again.');
  const recipe = { ...body, userId: id };
  return recipesModel.createRecipe(recipe);
};

const getRecipes = async () => {
  const recipes = await recipesModel.searchAllRecipes(); 
  console.log({ getRecipes: recipes });
  return recipes;
};

const getRecipe = async (userId) => {
  if (!ObjectId.isValid(userId)) throw new Error('recipe not found');
  const id = ObjectId(userId);
  const recipe = await recipesModel.searchById(id);
  if (!recipe) throw new Error('recipe not found');
  return recipe;
};

module.exports = {
  postRecipe,
  getRecipes,
  getRecipe,
};
