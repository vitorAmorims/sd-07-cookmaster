const express = require('express');
const { validateRecipes } = require('../middlewares');
const validateToken = require('../middlewares/validateToken');
const RecipesControllers = require('../controllers/RecipesControllers');

const router = express.Router();

const recipesPath = '/recipes';

router.post(
  recipesPath,
  validateToken,
  validateRecipes,
  RecipesControllers.addRecipe,
);

router.get(
  recipesPath,
  RecipesControllers.getAllRecipes,
);

module.exports = router;
