const recipeModel = require('./recipeModel');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipeModel.create(name, ingredients, preparation, userId);
  return newRecipe;
};

module.exports = {
  create,
  /* findById,
  findAll,
  update,
  del, */
};