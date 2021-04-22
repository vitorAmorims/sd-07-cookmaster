const express = require('express');
const recipesController = require('../controllers/recipesController');
const { tokenMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/recipes', tokenMiddleware, recipesController.createRecipe);
router.get('/recipes', recipesController.getAllRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);

module.exports = router;