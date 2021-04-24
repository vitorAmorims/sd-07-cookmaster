const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const recipeController = require('../controllers/recipeController');

router.post('/recipes', authMiddleware, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipes);

module.exports = router;