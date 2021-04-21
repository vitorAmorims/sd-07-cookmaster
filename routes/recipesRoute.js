const express = require('express');

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
} = require('../controllers/recipesController');

const {
  recipeDtataValidation,
} = require('../middlewares');

const validateToken = require('../auth/validateToken');

const recipesRoute = express.Router();

recipesRoute.post('/recipes', recipeDtataValidation, validateToken, createRecipe);

recipesRoute.get('/recipes', getRecipes);

recipesRoute.get('/recipes/:id', getRecipeById);

recipesRoute.put('/recipes/:id', validateToken, editRecipe);

module.exports = recipesRoute;