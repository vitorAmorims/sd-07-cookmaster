const express = require('express');

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
} = require('../controllers/recipesController');

const {
  recipeDtataValidation,
} = require('../middlewares');

const recipesId = '/recipes/:id';

const validateToken = require('../auth/validateToken');

const recipesRoute = express.Router();

recipesRoute.post('/recipes', recipeDtataValidation, validateToken, createRecipe);

recipesRoute.get('/recipes', getRecipes);

recipesRoute.get(recipesId, getRecipeById);

recipesRoute.put(recipesId, validateToken, editRecipe);

recipesRoute.delete(recipesId, validateToken, deleteRecipe);

module.exports = recipesRoute;