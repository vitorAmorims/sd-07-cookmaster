const { Router } = require('express');
const { OH_NO, CREATED, OK, NOT_FOUND, NO_CONTENT } = require('../../helpers/status');
const recipeService = require('./recipeService');
const { authMiddleware, recipeMiddleware } = require('../../middlewares');
const recipeModel = require('./recipeModel');
const { recipeNotFound } = require('../../helpers/errorMessage');

const authRecipeMiddleware = [authMiddleware, recipeMiddleware];

const recipeRouter = new Router();

recipeRouter.post('/', authRecipeMiddleware, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const createdRecipe = await recipeService.createRecipe(name, ingredients, preparation, token);
    res.status(CREATED).json({ recipe: createdRecipe });
  } catch (err) {
    res.status(OH_NO).json(err);
  }
});

recipeRouter.get('/', async (_req, res) => {
  try {
    const recipesData = await recipeModel.getAll();
    res.status(OK).json(recipesData);
  } catch (err) {
    res.status(OH_NO).json(err);
  }
});

recipeRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipeData = await recipeModel.getById(id);
    if (!recipeData) return res.status(NOT_FOUND).json(recipeNotFound);
    res.status(OK).json(recipeData);
  } catch (err) {
    res.status(OH_NO).json(err);
  }
});

recipeRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipeData = await recipeService.updateRecipe(name, ingredients, preparation, id);
    if (!recipeData) return res.status(NOT_FOUND).json(recipeNotFound);
    res.status(OK).json(recipeData);
  } catch (err) {
    res.status(OH_NO).json(err);
  }
});

recipeRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await recipeModel.removeRecipe(id);
    res.status(NO_CONTENT).json();
  } catch (err) {
    res.status(OH_NO).json(err);
  }
});

module.exports = recipeRouter;