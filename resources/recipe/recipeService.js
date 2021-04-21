const recipeModel = require('./recipeModel');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipeModel.create(name, ingredients, preparation, userId);
  return newRecipe;
};

const findAll = async () => {
  const allRecipes = await recipeModel.findAll();
  return allRecipes;
};

const findById = async (id) => {
  const foundRecipe = await recipeModel.findById(id);
  return foundRecipe;
};

module.exports = {
  create,
  findAll,
  findById,
  /* 
  update,
  del, */
};