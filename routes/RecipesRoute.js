const express = require('express');
const rescue = require('express-rescue');
const RecipesController = require('../controllers/RecipesController');
const {
  recipesValidate,
  tokenValidate,
  idRecipeValidate,
} = require('../middlewares');

const RECIPE_WITH_ID = '/recipes/:id';
const router = express.Router();

router.post('/recipes', recipesValidate, tokenValidate, rescue(RecipesController.create));
router.put(RECIPE_WITH_ID, recipesValidate, tokenValidate, rescue(RecipesController.update));
router.delete(RECIPE_WITH_ID, tokenValidate, rescue(RecipesController.deleteRecipe));
router.get(RECIPE_WITH_ID, idRecipeValidate, rescue(RecipesController.getById));
router.get('/recipes', rescue(RecipesController.getAll));

module.exports = router;
