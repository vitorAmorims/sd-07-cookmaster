const express = require('express');
const recipesControllers = require('../controllers/recipesControllers');
const recipesMiddewares = require('../middlewares/recipesMiddlewares');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/recipes', validateToken, recipesMiddewares.validateName, 
recipesMiddewares.validateIngredients, 
recipesMiddewares.validatePreparation, recipesControllers.registerRecipe);
router.get('/recipes', recipesControllers.getAllRecipes);
router.get('/recipes/:id', recipesControllers.getRecipeById);

module.exports = router;