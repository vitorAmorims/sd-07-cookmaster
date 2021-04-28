const express = require('express');

const recipesController = require('../controllers/recipesController');
const middleware = require('../middlewares');

const router = express.Router();

router.post('/recipes',
  middleware.authMiddleware,
  middleware.recipesMiddleware,
  recipesController.createRecipe);

router.get('/recipes', recipesController.getAllRecipes);

router.get('/recipes/:id', middleware.recipeIdMiddleware, recipesController.getRecipeById);

module.exports = router;