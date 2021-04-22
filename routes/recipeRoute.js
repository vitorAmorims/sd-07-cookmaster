const express = require('express');
const validateToken = require('../middlewares/validateToken');

const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.post('/recipes', validateToken, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);
router.put('/recipes/:id', validateToken, recipeController.updateRecipe);

module.exports = router;
