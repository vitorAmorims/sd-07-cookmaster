const express = require('express');
const recipeController = require('../controllers/recipeController');
const validateToken = require('../services/auth/validateToken');

const router = express.Router();

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes', validateToken, recipeController.addRecipe);

module.exports = router;
