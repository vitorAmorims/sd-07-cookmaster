const express = require('express');

const {
  createRecipe,
  getRecipes,
} = require('../controllers/recipesController');

const {
  recipeDtataValidation,
} = require('../middlewares');

const validateToken = require('../auth/validateToken');

const recipesRoute = express.Router();

recipesRoute.post('/recipes', recipeDtataValidation, validateToken, createRecipe);

recipesRoute.get('/recipes', getRecipes);

module.exports = recipesRoute;