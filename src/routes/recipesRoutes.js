const express = require('express');
const recipesController = require('../controllers/recipesController');
const mid = require('../middlewares');

const recipeUrl = '/recipes';
const router = express.Router();

router.post(recipeUrl, mid.validateToken, recipesController.createRecipe);
router.get(recipeUrl, recipesController.getAllRecipes);
router.get(`${recipeUrl}/:id`, recipesController.getRecipeById);
router.put(
  `${recipeUrl}/:id`, [mid.validateToken, mid.checkIfAdmin], recipesController.updateRecipe,
);
router.delete(
  `${recipeUrl}/:id`, [mid.validateToken, mid.checkIfAdmin], recipesController.deleteRecipe,
);

module.exports = router;