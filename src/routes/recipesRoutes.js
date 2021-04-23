const express = require('express');
const {
  saveRecipe,
  getAllRecipes,
  getRecipeById,
} = require('../controllers/recipesControllers');

const router = express.Router();

router.post('/recipes', saveRecipe);
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);

module.exports = router;
