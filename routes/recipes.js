const express = require('express');
const { createRecipeController,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
 } = require('../controllers/recipes');
const validateToken = require('../middlewares/validateToken');
const updateToken = require('../middlewares/updateToken');

const router = express.Router();

router.route('/recipes')
  .post(validateToken, createRecipeController)
  .get(getAllRecipes);

router.route('/recipes/:id')
  .get(getRecipeById)
  .put(updateToken, updateRecipe);

module.exports = router;