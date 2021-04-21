const rescue = require('express-rescue');
require('dotenv').config();

const RecipesModel = require('../models/recipesModel');

const {
  OK,
  CREATED,
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

module.exports = {
  createRecipe,
  getRecipes,
};