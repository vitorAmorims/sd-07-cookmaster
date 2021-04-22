const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

const recipeId = '/recipes/:id';

router.post('/recipes', validateToken, recipesController.addRecipe);
router.get('/recipes', recipesController.getRecipes);
router.get(recipeId, recipesController.getRecipeById);
router.put(recipeId, validateToken, recipesController.updateRecipeById);
router.delete(recipeId, validateToken, recipesController.excludeRecipeById);

module.exports = router;
