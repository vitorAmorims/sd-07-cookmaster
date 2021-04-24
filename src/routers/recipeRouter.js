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
const endpointRecipesId = '/recipes/:id';

Recipes.get('/recipes', readAllRecipes);

Recipes.get(endpointRecipesId, readRecipeById);

Recipes.use(validateToken);

Recipes.post('/recipes', createRecipe);

Recipes.put(endpointRecipesId, validateUserAuthorization, updateRecipeById);

Recipes.delete(endpointRecipesId, validateUserAuthorization, deleteRecipeById);

Recipes.put(
  '/recipes/:id/image/',
  [validateUserAuthorization, upload.single('image')],
  createRecipeImageById,
);

module.exports = Recipes;
