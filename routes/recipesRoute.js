const express = require('express');
const recipesControllers = require('../controllers/recipesControllers');
const recipesMiddewares = require('../middlewares/recipesMiddlewares');
const validateToken = require('../middlewares/validateToken');

const endPoint = '/recipes/:id';

const router = express.Router();

router.post('/recipes', validateToken, recipesMiddewares.validateName, 
recipesMiddewares.validateIngredients, 
recipesMiddewares.validatePreparation, recipesControllers.registerRecipe);
router.get('/recipes', recipesControllers.getAllRecipes);
router.get(endPoint, recipesControllers.getRecipeById);
router.put(endPoint, validateToken, recipesControllers.updateRecipe);
router.delete(endPoint, validateToken, recipesControllers.deleteRecipe);

module.exports = router;