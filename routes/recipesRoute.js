const { Router } = require('express');
const { recipesController } = require('../controllers');
const middlewares = require('../middlewares');

const recipesRoute = Router();

recipesRoute.post(
  '/recipes', 
  middlewares.authMiddleware,
  middlewares.recipeMiddleware,
  recipesController.createRecipe,
);

module.exports = recipesRoute;