const express = require('express');

const tokenMiddleware = require('../middlewares/tokenAuth');
const multerMiddleware = require('../middlewares/multer');

const recipe = require('../controller/recipes');

const recipeRoute = express.Router();

recipeRoute
  .get('/', recipe.getAllRecipes)
  .get('/:id', recipe.getById)
  .post('/', tokenMiddleware, recipe.addRecipes)
  .put('/:id', tokenMiddleware, recipe.editRecipes)
  .delete('/:id', tokenMiddleware, recipe.deleteRecipe);

recipeRoute.put('/:id/image', tokenMiddleware, multerMiddleware, recipe.uploadImage);

module.exports = recipeRoute;