const { Router } = require('express');
const { recipesController } = require('../controllers');
const middlewares = require('../middlewares');

const recipesRoute = Router();

recipesRoute.post(
  '/recipes', 
  middlewares.authMiddleware,
  middlewares.recipeMiddleware.dataRecipeInsertCheck,
  recipesController.createRecipe,
);

recipesRoute.get(
  '/recipes/:id',
  middlewares.recipeMiddleware.idExistCheck,
  recipesController.getRecipeById,
);
recipesRoute.get('/recipes', recipesController.getRecipes);

module.exports = recipesRoute;