const express = require('express');
const { recipeControllers } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const route = express.Router();

const recipeIdRoute = '/recipes/:id';

route.get('/recipes', recipeControllers.getAllRecipes);
route.get(recipeIdRoute, recipeControllers.getRecipesById);
route.put(recipeIdRoute, tokenValidator, recipeControllers.editRecipe);
route.delete(recipeIdRoute, tokenValidator, recipeControllers.deletRecipe);
route.post('/recipes', tokenValidator, recipeControllers.creatRecipe);

module.exports = route;