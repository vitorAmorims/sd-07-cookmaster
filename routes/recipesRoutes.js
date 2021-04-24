const express = require('express');
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/recipes',
  middlewares.validateRecipe,
  middlewares.authMiddleware,
  recipesController.addRecipe);
router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);
router.put('/recipes/:id',
  middlewares.authMiddleware,
  middlewares.recipeUserLoggedOrAdmin,
  recipesController.updateRecipe);

router.use(middlewares.errorMiddleware);

module.exports = router;