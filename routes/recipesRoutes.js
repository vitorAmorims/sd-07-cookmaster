const express = require('express');
const recipesController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

const router = express.Router();
const routeId = '/recipes/:id';

router.post('/recipes', middlewares.token, recipesController.createRecipe);
router.get('/recipes', recipesController.getAllRecipes);
router.get(routeId, recipesController.getRecipeById);
router.put(routeId, middlewares.token, recipesController.updateRecipe);
router.delete(routeId, middlewares.token, recipesController.deleRecipe);

module.exports = router;
