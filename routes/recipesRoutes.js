const express = require('express');

const recipesController = require('../controllers/recipesController');
const middleware = require('../middlewares');

const router = express.Router();

const routeDomain = 'recipes';

router.post('/recipes',
  middleware.authMiddleware,
  middleware.recipesMiddleware,
  recipesController.createRecipe);

router.get('/recipes', recipesController.getAllRecipes);

router.get(`/${routeDomain}/:id`, middleware.recipeIdMiddleware, recipesController.getRecipeById);

router.put(`/${routeDomain}/:id`,
  middleware.updateAuthMiddleware,
  middleware.recipeIdMiddleware,
  recipesController.updateRecipe);

router.delete(`/${routeDomain}/:id`,
  middleware.updateAuthMiddleware,
  middleware.recipeIdMiddleware,
  recipesController.deleteRecipe);

module.exports = router;