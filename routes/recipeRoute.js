const express = require('express');

const recipeRouter = express.Router();
const { 
  insertNewRecipe, 
  findAllRecipes, 
  findRecipeById,
  updateRecipeById, 
} = require('../controller/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAuthorMiddleware = require('../middleware/verifyAuthorMiddleware');

recipeRouter.post('/recipes', authMiddleware, insertNewRecipe);
recipeRouter.put('/recipes/:id', [authMiddleware, verifyAuthorMiddleware], updateRecipeById);
recipeRouter.get('/recipes', findAllRecipes);
recipeRouter.get('/recipes/:id', findRecipeById);

module.exports = recipeRouter;
