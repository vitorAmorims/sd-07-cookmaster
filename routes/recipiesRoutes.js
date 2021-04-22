const express = require('express');
const recipesController = require('../controllers/recipiesController');
const validateToken = require('../middlewares/validToken');

const router = express.Router();
const recipeRoute = '/recipes';
const recipeRouteId = '/recipes/:id';

router.post(recipeRoute, validateToken, recipesController.addrecipe);
router.get(recipeRoute, recipesController.getAllRecipes);
router.get(recipeRouteId, recipesController.getRecipeById);
router.put(recipeRouteId, validateToken, recipesController.updateRecipe);
router.delete(recipeRouteId, validateToken, recipesController.deleteRecipe);

module.exports = router;