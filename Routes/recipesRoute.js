const express = require('express');
const recipes = require('../Controllers/recipesController');
const validateTokenMidd = require('../Middlewares/validateTokenMidd');
const addRecipesMidd = require('../Middlewares/addRecipesMidd');
const uploadImage = require('../Helper/uploadImage');

const router = express.Router();
router.use(express.static(`${__dirname}/images/`));
router.post('/recipes', validateTokenMidd, addRecipesMidd, recipes.createRecipes);
router.get('/recipes', recipes.getAllRecipes);
router.put('/recipes/:id/image/', [validateTokenMidd, uploadImage], recipes.uploadImage);
router.route('/recipes/:id') // Dica do ThaDEUSO
  .get(recipes.getRecipeById)
  .put(validateTokenMidd, recipes.updateRecipe)
  .delete(validateTokenMidd, recipes.deleteRecipe);

module.exports = router;