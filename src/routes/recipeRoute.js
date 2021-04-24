const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const recipeController = require('../controllers/recipeController');

router.post('/recipes', authMiddleware, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);
router.put('/recipes/:id', authMiddleware, recipeController.updateRecipe);

module.exports = router;