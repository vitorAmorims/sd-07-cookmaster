const express = require('express');
const {
  validateRecipes,
} = require('../middlewares');
const validateToken = require('../middlewares/validateToken');
const RecipesControllers = require('../controllers/RecipesControllers');

const router = express.Router();

const recipesPath = '/recipes';
const recipesSpecificPath = '/recipes/:id';

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

router.get(
  recipesSpecificPath,
  RecipesControllers.getRecipeById,
);

router.put(
  recipesSpecificPath,
  validateToken,
  RecipesControllers.updateRecipe,
);

module.exports = router;
