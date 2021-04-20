const express = require('express');

const router = express.Router();
const middleares = require('../middlewares');
const recipes = require('../controllers/recipesController');

router.post('/recipes',
    middleares.checkRegisterRecipes,
    middleares.authentication,
    recipes.registerRecipe);
router.get('/recipes', recipes.getAllRecipes);
router.get('/recipes/:id', recipes.getById);

module.exports = router;