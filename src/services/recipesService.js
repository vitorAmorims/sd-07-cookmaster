const joi = require('joi');
const { ObjectId } = require('mongodb');
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

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new InvalidEntries('recipe not found', 404);
  }
};

const createRecipe = async (name, ingredients, preparation, user) => {
  validateRecipeInput(name, ingredients, preparation);
  const { _id: userId } = user;
  const newRecipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return ({ recipe: { ...newRecipe } });
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  validateId(id);
  const recipe = await recipesModel.getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};