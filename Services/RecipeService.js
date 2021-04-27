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

const recipEdi = async (id, name, ingredients, preparation) => {
  if (typeof name !== 'string') throw error.invalidEntries;
  if (typeof ingredients !== 'string') throw error.invalidEntries;
  if (typeof preparation !== 'string') throw error.invalidEntries;
  await getRecipeForId(id);

  return RecipeModel.edit(id, name, ingredients, preparation);
};

module.exports = {
  addRecipe,
  getRecipe,
  getRecipeForId,
  recipEdi,
};