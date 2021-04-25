const express = require('express');
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();

const route = '/recipes/:id';

router.post('/recipes',
middlewares.recipesEntriesMiddleware,
middlewares.validateToken,
recipesController.createRecipe);

router.get('/recipes', recipesController.getAllRecipes);

router.get(route,
  middlewares.recipesIdMiddleware,
  recipesController.getRecipeById);

router.put(route,
  middlewares.validateToken,
  middlewares.loggedInMiddleware,
  recipesController.updateRecipe);

router.delete(route,
  middlewares.validateToken,
  middlewares.loggedInMiddleware,
  recipesController.deleteRecipe);

module.exports = router;
