const express = require('express');
const { recipeController } = require('../controllers');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const recipesRoutes = express.Router();

recipesRoutes.post('/recipes', tokenValidationMiddleware, recipeController.addRecipe);
recipesRoutes.get('/recipes/:id', recipeController.getRecipeById);
recipesRoutes.get('/recipes', recipeController.getAllRecipes);
recipesRoutes.put('/recipes/:id', tokenValidationMiddleware, recipeController.editRecipe);

module.exports = recipesRoutes;
