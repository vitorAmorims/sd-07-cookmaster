const recipesModels = require('../models/recipesModels');
const HttpException = require('./HttpException');
const { codes, messages } = require('../httpResponses.json');

const createRecipe = async (recipe) => {
  const { name, ingredients, preparation } = recipe;

  if (!name || !ingredients || !preparation) {
    throw new HttpException(messages.invalidEntries, codes.BAD_REQUEST);
  }

  return recipesModels.createRecipe(recipe);
};

const findAllRecipes = async () => recipesModels.findAllRecipes();

module.exports = {
  createRecipe,
  findAllRecipes,
};
