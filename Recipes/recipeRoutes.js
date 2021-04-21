const express = require('express');
const recipeControllers = require('./recipeControllers');
const { validadeToken } = require('./recipeMiddlewares');

const router = express.Router();

router.post('/recipes', validadeToken, recipeControllers.createRecipe); // req. 3

module.exports = router;
