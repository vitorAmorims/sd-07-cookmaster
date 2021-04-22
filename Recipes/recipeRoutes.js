const express = require('express');
const recipeControllers = require('./recipeControllers');
const { validadeToken } = require('./recipeMiddlewares');

const router = express.Router();

router.post('/recipes', validadeToken, recipeControllers.createRecipe); // req. 3

router.get('/recipes', recipeControllers.getAllRecipes); // req. 4
router.get('/recipes/:id', recipeControllers.getRecipeById); // req. 5

router.put('/recipes/:id', validadeToken, recipeControllers.updateRecipe); // req. 7

module.exports = router;
