const express = require('express');
const RecipesController = require('../Controllers/RecipesController');
const middlewareToken = require('../Middlewares/middlewareToken');

const router = express.Router();
const routWithId = '/recipes/:id';

router.post('/recipes', middlewareToken.validateToken, RecipesController.addRecipes);
router.get('/recipes', RecipesController.getAllRecipes);
router.get(routWithId, RecipesController.getForId);
router.put(routWithId, middlewareToken.validateToken, RecipesController.editRecipe);
router.delete(routWithId, middlewareToken.validateToken, RecipesController.deleteRecipe);

module.exports = router;