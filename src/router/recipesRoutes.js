const express = require('express');
const { recipesController } = require('../controller');
const middlewares = require('../middleware');
const { RECIPE_BY_ID } = require('../service/recipesService');

const router = express.Router();

const { validateTokenMiddleware } = middlewares;

router.post('/recipes',
  validateTokenMiddleware,
  recipesController.createRecipe);

router.get('/recipes',
  recipesController.getAllRecipes);

router.get(RECIPE_BY_ID,
  recipesController.getRecipeById);

router.put(RECIPE_BY_ID,
validateTokenMiddleware,
  recipesController.updateRecipe);

router.delete(RECIPE_BY_ID,
  validateTokenMiddleware,
  recipesController.deleteRecipe);

module.exports = router;