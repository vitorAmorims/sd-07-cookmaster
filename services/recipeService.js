const recipeModel = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation) => {
  const newUser = await recipeModel.createRecipe(name, ingredients, preparation);
  return newUser;
};

module.exports = {
  createRecipe,
};
