const recipesModel = require('../models/recipesModel');

const verifyRecipe = (name, preparation, ingredients) => {
  if (name === undefined || preparation === undefined || ingredients === undefined) {
    return {
      code: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  return {};
};

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const checkedRecipe = verifyRecipe(name, preparation, ingredients);

  if (checkedRecipe.message) return checkedRecipe;
  const newRecipes = await recipesModel.registerRecipes(
    name,
    ingredients,
    preparation,
    userId,
  );
  return newRecipes;
};

module.exports = {
  registerRecipes,
};
