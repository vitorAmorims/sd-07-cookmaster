const rescue = require('express-rescue');
const model = require('../models');
const recipesService = require('../services');
const { statusCodes } = require('../utils');

const addRecipeController = rescue(async (req, res) => {
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  console.log('name no controller: ', name);
  recipesService.recipesService.recipePostService(name, ingredients, preparation);
  const user = await model.recipesModel
    .createRecipe({ userId, name, ingredients, preparation })
    .catch((err) => console.error(err));
  res.status(statusCodes.CREATED).send(user);
});

const getAllRecipesController = rescue(async (req, res) => {
  const allRecipes = await model.recipesModel.getAllRecipes();
  return res.status(statusCodes.SUCCESS).send(allRecipes);
});

const getRecipesByIdController = rescue(async (req, res) => {
  const { id } = req.params;
  const recipeById = await model.recipesModel.getRecipeById(id);
  recipesService.recipesService.recipesListService(recipeById);
  return res.status(statusCodes.SUCCESS).send(recipeById);
});

module.exports = {
  addRecipeController,
  getAllRecipesController,
  getRecipesByIdController,
};