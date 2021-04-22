const express = require('express');
const recipeControllers = require('./recipeControllers');
const { validadeToken } = require('./recipeMiddlewares');

const router = express.Router();

const RECIPESIDROUTE = '/recipes/:id';

router.post('/recipes', validadeToken, recipeControllers.createRecipe); // req. 3

router.get('/recipes', recipeControllers.getAllRecipes); // req. 4
router.get(RECIPESIDROUTE, recipeControllers.getRecipeById); // req. 5

router.put(RECIPESIDROUTE, validadeToken, recipeControllers.updateRecipe); // req. 7

router.delete(RECIPESIDROUTE, validadeToken, recipeControllers.deleteRecipe); // req. 8

module.exports = router;
