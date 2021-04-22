const { Router } = require('express');
const { OH_NO, CREATED } = require('../../helpers/status');
const recipeService = require('./recipeService');
const { authMiddleware, recipeMiddleware } = require('../../middlewares');

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

module.exports = recipeRouter;