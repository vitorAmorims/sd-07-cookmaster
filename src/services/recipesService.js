const joi = require('joi');
const recipesModel = require('../models/recipesModel');
const InvalidEntries = require('../customErrors/invalidEntries');

const validateRecipeInput = (name, ingredients, preparation) => {
  const schema = joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
  });
  const { error } = schema.validate({ name, ingredients, preparation });
  if (error) {
    throw new InvalidEntries('Invalid entries. Try again.', 400);
  }
};

const createRecipe = async (name, ingredients, preparation, user) => {
  validateRecipeInput(name, ingredients, preparation);
  const { _id: userId } = user;
  const newRecipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return ({ recipe: { ...newRecipe } });
};

module.exports = {
  createRecipe,
};