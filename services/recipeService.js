const recipe = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipe.create(name, ingredients, preparation, userId);

  return newRecipe;
};

const getAllRecipe = async () => {
  const recipes = await recipe.getAll();
  
  return recipes;
};

const getOneRecipe = async (id) => {
  const list = await recipe.getById(id);

  return list;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const objRecipe = await recipe.getById(id);
  if (!objRecipe) {
    return null;
  }

  const recipeUpdate = await recipe.update({ id, name, ingredients, preparation });

  return recipeUpdate;
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getOneRecipe,
  updateRecipe, 
};