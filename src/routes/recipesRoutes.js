const express = require('express');
const {
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require('../controllers/recipesControllers');

const router = express.Router();

router.post('/recipes', saveRecipe);
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.put('/recipes/:id', updateRecipeById);
router.delete('/recipes/:id', deleteRecipeById);

module.exports = router;
