const rescue = require('express-rescue');
require('dotenv').config();

const RecipesModel = require('../models/recipesModel');

const {
  OK,
  CREATED,
  NOT_FOUND,
} = require('../httpStatusCodes');

const createRecipe = rescue(async (req, res) => {
  const recipe = req.body;

  const { _id } = req.user;

  recipe.userId = _id;

  const newRecipe = await RecipesModel.insertRecipe(recipe);

  return res.status(CREATED).json({ recipe: newRecipe.ops[0] });
});

const getRecipes = rescue(async (req, res) => {
  const recipes = await RecipesModel.findAll();

  return res.status(OK).json(recipes);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipesModel.findById(id);

  if (!recipe) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }

  return res.status(OK).json(recipe);
});

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};