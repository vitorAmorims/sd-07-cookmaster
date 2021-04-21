const { ObjectId } = require('mongodb');
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

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new HttpException(messages.recipeNotFound, codes.NOT_FOUND);
  }

  const recipe = await recipesModels.findById(id);
  if (recipe === null || !ObjectId.isValid(id)) {
    throw new HttpException(messages.recipeNotFound, codes.NOT_FOUND);
  }

  return recipe;
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findById,
};
