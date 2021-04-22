const express = require('express');
const recipeControllers = require('./recipeControllers');
const { validadeToken } = require('./recipeMiddlewares');

const router = express.Router();

router.post('/recipes', validadeToken, recipeControllers.createRecipe); // req. 3
router.get('/recipes', recipeControllers.getAllRecipes); // req. 4

module.exports = router;
