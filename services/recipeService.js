const recipe = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipe.create(name, ingredients, preparation, userId);

  return newRecipe;
};

const getAllRecipe = async () => {
  const recipes = await recipe.getAll();
  
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipe, 
};