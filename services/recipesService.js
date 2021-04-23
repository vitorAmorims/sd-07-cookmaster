const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation) => {
const newRecipe = await recipesModel.createRecipe(name, ingredients, preparation);
  return newRecipe;
};

module.exports = {
  createRecipe,
};
