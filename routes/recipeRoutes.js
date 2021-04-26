const express = require('express');
const recipeController = require('../controllers/recipeController');
const validateToken = require('../services/auth/validateToken');

const router = express.Router();
const recipeId = '/recipes/:id';

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes', validateToken, recipeController.addRecipe);
router.get(recipeId, recipeController.getRecipeById);
router.put(recipeId, validateToken, recipeController.editRecipeById);
router.delete(recipeId, validateToken, recipeController.deleteRecipeById);

module.exports = router;
