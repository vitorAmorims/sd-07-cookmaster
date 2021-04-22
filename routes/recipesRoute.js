const express = require('express');

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImage,
} = require('../controllers/recipesController');

const {
  recipeDtataValidation,
} = require('../middlewares');

const upload = require('../config/multer');

const validateToken = require('../auth/validateToken');

const recipesRoute = express.Router();

const recipesPath = 'recipes';

recipesRoute.post(`/${recipesPath}`, recipeDtataValidation, validateToken, createRecipe);

recipesRoute.get(`/${recipesPath}`, getRecipes);

recipesRoute.get(`/${recipesPath}/:id`, getRecipeById);

recipesRoute.put(`/${recipesPath}/:id`, validateToken, editRecipe);

recipesRoute.delete(`/${recipesPath}/:id`, validateToken, deleteRecipe);

recipesRoute.put(`/${recipesPath}/:id/image`, validateToken, upload.single('image'), addImage);

module.exports = recipesRoute;