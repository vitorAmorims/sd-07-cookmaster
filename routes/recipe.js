const express = require('express');

const tokenMiddleware = require('../middlewares/tokenAuth');

const recipe = require('../controller/recipes');

const recipeRoute = express.Router();

recipeRoute.post('/', tokenMiddleware, recipe.addRecipesController);

module.exports = recipeRoute;