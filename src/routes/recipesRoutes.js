const express = require('express');
const {
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require('../controllers/recipesControllers');

const router = express.Router();

router
  .route('/recipes')
  .post(saveRecipe)
  .get(getAllRecipes);

router
  .route('/recipes/:id')
  .get(getRecipeById)
  .put(updateRecipeById)
  .delete(deleteRecipeById);

module.exports = router;
