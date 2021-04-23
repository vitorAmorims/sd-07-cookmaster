const express = require('express');
const recipes = require('../Controllers/recipesController');
const validateTokenMidd = require('../Middlewares/validateTokenMidd');
const addRecipesMidd = require('../Middlewares/addRecipesMidd');

const router = express.Router();

router.post('/recipes', validateTokenMidd, addRecipesMidd, recipes.createRecipes);
router.get('/recipes', recipes.getAllRecipes);
router.get('/recipes/:id', recipes.getRecipeById);

module.exports = router;