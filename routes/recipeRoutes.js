const express = require('express');
const recipeControllers = require('../controllers/recipeControllers');
const { auth, especificAuth } = require('../middlewares/userMiddlewares');

const router = express.Router();
const RECIPES = '/recipes';
const RECIPESID = '/recipes/:id';

router.get(RECIPES, recipeControllers.getAllRecipes);
router.get(RECIPESID, recipeControllers.getRecipeById);
router.post(RECIPES, auth, recipeControllers.createRecipe);
router.put(RECIPESID, especificAuth, recipeControllers.updateRecipe);
router.delete(RECIPESID, especificAuth, recipeControllers.deleteRecipe);

module.exports = router;
