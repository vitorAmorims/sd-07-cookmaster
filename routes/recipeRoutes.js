const express = require('express');
const recipeController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

const router = express.Router();
router.post(
  '/recipes',
  middlewares.validateEntriesRecipeMiddleware,
  middlewares.verifyTokenMiddleware,   
  recipeController.createRecipe,
);

module.exports = router;