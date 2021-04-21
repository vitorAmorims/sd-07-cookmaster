const recipeModel = require('./recipeModel');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipeModel.create(name, ingredients, preparation, userId);
  return newRecipe;
};

const findAll = async () => {
  const allRecipes = await recipeModel.findAll();
  return allRecipes;
};

module.exports = {
  create,
  findAll,
  /* findById,
  update,
  del, */
};