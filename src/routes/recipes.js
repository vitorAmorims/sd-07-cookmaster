const express = require('express');
const { checkToken, checkRecipeBody } = require('../middleware/recipesMiddleware');
const recipesController = require('../controller/recipesController');

const router = express.Router();

router.post('/recipes', checkToken, checkRecipeBody, recipesController.createRecipes);

module.exports = router;