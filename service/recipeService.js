const recipeModel = require('../model/recipeModel');

const insertNewRecipe = async (recipe, authorID) => {
  const objectRecipe = recipe;
  const recipeParameters = ['preparation', 'name', 'ingredients'];
  const recipeKeys = Object.keys(objectRecipe);
  const isValidRecipe = recipeParameters.every((param) => recipeKeys.includes(param));
  objectRecipe.userId = authorID;

  if (!isValidRecipe) throw new Error('Invalid entries. Try again.');

  return recipeModel.insertNewRecipe(objectRecipe);
};

module.exports = {
  insertNewRecipe,
};