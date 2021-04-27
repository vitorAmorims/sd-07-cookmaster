const RecipeModel = require('../Models/RecipeModel');
const error = require('../error/index');

const addRecipe = async (name, ingredients, preparation, id) => {
  if (typeof name !== 'string') throw error.invalidEntries;
  if (typeof ingredients !== 'string') throw error.invalidEntries;
  if (typeof preparation !== 'string') throw error.invalidEntries;

  return RecipeModel.newRecipe(name, ingredients, preparation, id);
};

const getRecipe = async () => RecipeModel.getOneRecipe();

const getRecipeForId = async (id) => RecipeModel.searchRecipeForId(id);
module.exports = {
  addRecipe,
  getRecipe,
  getRecipeForId,
};