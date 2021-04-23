const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');
const verifyOwnerRecipeOrAdmin = require('../middlewares/verifyOwnerRecipeOrAdmin');

const router = express.Router();

router
  .route('/recipes')
  .get(recipesController.getAllRecipes)
  .post(validateJWT, recipesController.createRecipe);

router
  .route('/recipes/:id')
  .get(recipesController.getRecipeById)
  .put(validateJWT, verifyOwnerRecipeOrAdmin, recipesController.updateRecipe)
  .delete(validateJWT, verifyOwnerRecipeOrAdmin, recipesController.deleteRecipe);

module.exports = router;