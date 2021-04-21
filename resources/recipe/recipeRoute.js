const express = require('express');
const rescue = require('express-rescue');

const { validateTokenMiddleware } = require('../../middlewares');

const router = express.Router();

const { 
  createRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('./recipeController');

const recipeValidateMiddleware = require('./recipeValidateMiddleware');

const BASE_ENDPOINT = '/recipes';

router.post(BASE_ENDPOINT,
  [validateTokenMiddleware, recipeValidateMiddleware], 
  rescue(createRecipe));
router.get(BASE_ENDPOINT, rescue(findAllRecipes));
router.get(`${BASE_ENDPOINT}/:id`, rescue(findRecipeById));
router.put(`${BASE_ENDPOINT}/:id`,
  [validateTokenMiddleware, recipeValidateMiddleware],
  rescue(updateRecipe));
router.delete(`${BASE_ENDPOINT}/:id`, validateTokenMiddleware, rescue(deleteRecipe));

module.exports = router; 
