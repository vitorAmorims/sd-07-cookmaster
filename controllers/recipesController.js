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

const updateRecipeController = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updatedRecipe = await model
    .recipesModel.updateRecipe({ id, name, ingredients, preparation });
  return res.status(statusCodes.SUCCESS).send(updatedRecipe);
});

const deleteRecipeController = rescue(async (req, res) => {
  const { id } = req.params;
  await model
  .recipesModel.deleteRecipe(id);
  return res.status(statusCodes.NO_CONTENT).send();
});

const addImageController = rescue(async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const image = `localhost:3000/images/${filename}`;
  const recipe = await model
  .recipesModel.getRecipeById(id);
  const updatedRecipe = await model.recipesModel.updateRecipe({ id, recipe, image });
  return res.status(statusCodes.SUCCESS).send(updatedRecipe);
});

module.exports = {
  addRecipeController,
  getAllRecipesController,
  getRecipesByIdController,
  updateRecipeController,
  deleteRecipeController,
  addImageController,
};
