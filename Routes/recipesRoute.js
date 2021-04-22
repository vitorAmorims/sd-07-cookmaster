const express = require('express');
const recipes = require('../Controllers/recipesController');
const validateTokenMidd = require('../Middlewares/validateTokenMidd');
const addRecipesMidd = require('../Middlewares/addRecipesMidd');

const router = express.Router();

router.post('/recipes', validateTokenMidd, addRecipesMidd, recipes.createRecipes);

module.exports = router;