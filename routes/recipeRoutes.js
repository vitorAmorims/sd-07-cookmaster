const express = require('express');
const recipeController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

const URL_RECIPES_ID = '/recipes/:id';

const router = express.Router();
router.get('/recipes', recipeController.allRecipes);
router.get(
  URL_RECIPES_ID,
  middlewares.validateRecipeExistsMiddleware, 
  recipeController.oneRecipe,
  );
router.put(
  URL_RECIPES_ID,
  middlewares.verifyTokenUpdateRecipeMiddleware,
  recipeController.updateOneRecipe,
  ); 
router.post(
  '/recipes',
  middlewares.validateEntriesRecipeMiddleware,
  middlewares.verifyTokenMiddleware,   
  recipeController.createRecipe,
);
router.delete(
  URL_RECIPES_ID,
  middlewares.verifyTokenUpdateRecipeMiddleware,
  recipeController.deleteRecipe,
  );

module.exports = router;