const express = require('express');

const { recipesMiddleware } = require('../middlewares');
const { validateToken } = recipesMiddleware;
const { recipesController } = require('../controllers');
const {
  createRecipe,
  readAllRecipes,
  readRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = recipesController;

const Recipes = express.Router();

Recipes.get('/recipes', readAllRecipes);

Recipes.get('/recipes/:id', readRecipeById);

Recipes.use(validateToken);

Recipes.post('/recipes', createRecipe);

Recipes.put('/recipes/:id', updateRecipeById);

Recipes.delete('/recipes/:id', deleteRecipeById);

module.exports = Recipes;
