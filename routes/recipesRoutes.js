const express = require('express');
const recipesController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/recipes', middlewares.token, recipesController.createRecipe);
router.get('/recipes', recipesController.getAllRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);

module.exports = router;
