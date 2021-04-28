const express = require('express');
const recipeController = require('../controllers/recipeController');
const { validateToken, validateRecipe, validateId } = require('../middlewares');

const router = express.Router();
const idRoute = '/recipes/:id';

router.post('/recipes', validateToken, validateRecipe, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipe);
router.get(idRoute, validateId, recipeController.getRecipeById);
router.delete(idRoute, validateToken, validateId, recipeController.excludeRecipe);
router.put(idRoute, validateToken, validateId, recipeController.editRecipe);

module.exports = router;