const express = require('express');
const recipesController = require('../controllers/recipeController');

const router = express.Router();

router.post('/recipes', recipesController.createRecipe);

module.exports = router;
