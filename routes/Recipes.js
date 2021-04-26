const express = require('express');
const { validateRecipes } = require('../middlewares');
const validateToken = require('../middlewares/validateToken');
const RecipesControllers = require('../controllers/RecipesControllers');

const router = express.Router();

router.post(
  '/recipes',
  validateToken,
  validateRecipes,
  RecipesControllers.addRecipe,
);

module.exports = router;
