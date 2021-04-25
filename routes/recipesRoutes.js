const express = require('express');
const { recipeController } = require('../controllers');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const recipesRoutes = express.Router();

recipesRoutes.post('/recipes', tokenValidationMiddleware, recipeController.addRecipe);

module.exports = recipesRoutes;
