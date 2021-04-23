const express = require('express');

const { recipesMiddleware } = require('../middlewares');
const { validateToken, validateUserAuthorization, upload } = recipesMiddleware;

const { recipesController } = require('../controllers');
const {
  createRecipe,
  readAllRecipes,
  readRecipeById,
  updateRecipeById,
  deleteRecipeById,
  createRecipeImageById,
} = recipesController;

const Recipes = express.Router();

Recipes.get('/recipes', readAllRecipes);

Recipes.get('/recipes/:id', readRecipeById);

Recipes.use(validateToken);

Recipes.post('/recipes', createRecipe);

Recipes.put('/recipes/:id', validateUserAuthorization, updateRecipeById);

Recipes.delete('/recipes/:id', validateUserAuthorization, deleteRecipeById);

Recipes.put(
  '/recipes/:id/image/',
  [validateUserAuthorization, upload.single('image')],
  createRecipeImageById,
);

module.exports = Recipes;
