const rescue = require('express-rescue');
require('dotenv').config();

const RecipesModel = require('../models/recipesModel');

const {
  OK,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  UNAUTHORIZED,
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

const editRecipe = rescue(async (req, res) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  const newRecipe = req.body;

  const recipe = await RecipesModel.findById(id);

  if (role === 'admin' || recipe.userId.equals(_id)) {
    const editedRecipe = await RecipesModel.updateOne(id, newRecipe);

    return res.status(OK).json(editedRecipe);
  }

  return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
});

const deleteRecipe = rescue(async (req, res) => {
  const { _id, role } = req.user;
  const { id } = req.params;

  const recipe = await RecipesModel.findById(id);

  if (role === 'admin' || recipe.userId.equals(_id)) {
    await RecipesModel.deleteOne(id);
    return res.status(NO_CONTENT).json();
  }

  return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
});

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};