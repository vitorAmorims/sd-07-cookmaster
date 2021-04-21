const express = require('express');

const {
  createRecipe,
} = require('../controllers/recipesController');

const {
  recipeDtataValidation,
} = require('../middlewares');

const recipesRoute = express.Router();

recipesRoute.post('/recipes', recipeDtataValidation, createRecipe);

module.exports = recipesRoute;