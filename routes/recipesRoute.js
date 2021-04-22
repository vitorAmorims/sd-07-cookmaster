const express = require('express');
const recipesController = require('../controllers/recipesController');
const { tokenMiddleware } = require('../middlewares');

const router = express.Router();

const recipesIdRoute = '/recipes/:id';

router.post('/recipes', tokenMiddleware, recipesController.createRecipe);
router.get('/recipes', recipesController.getAllRecipes);
router.get(recipesIdRoute, recipesController.getRecipeById);
router.put(recipesIdRoute, tokenMiddleware, recipesController.updateRecipe);
router.delete(recipesIdRoute, tokenMiddleware, recipesController.deleteRecipe);

module.exports = router;