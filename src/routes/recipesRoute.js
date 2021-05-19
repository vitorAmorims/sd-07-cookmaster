const express = require('express');
const { recipeControllers } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const route = express.Router();

route.get('/recipes', recipeControllers.getAllRecipes);
route.get('/recipes/:id', recipeControllers.getRecipesById);
route.post('/recipes', tokenValidator, recipeControllers.creatRecipe);

module.exports = route;