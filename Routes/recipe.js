const express = require('express');
const recipe = require('../Controller/recipe');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/recipes')
  .post(validateToken, recipe.create)
  .get(recipe.getAllRecipes);

router.route('/recipes/:id')
  .get(recipe.getById)
  .put(validateToken, recipe.updateRecipe);

module.exports = router;