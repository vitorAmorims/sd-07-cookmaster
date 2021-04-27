const express = require('express');
const recipeController = require('../controllers/recipeController');
const { validateToken, validateRecipe, validateId } = require('../middlewares');

const router = express.Router();

router.post('/recipes', validateToken, validateRecipe, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipe);
router.get('/recipes/:id', validateId, recipeController.getRecipeById);
// router.delete('/recipe/:id', validateToken, recipeController);

module.exports = router;