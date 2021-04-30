const express = require('express');
const {
  postRecipe,
  getRecipes,
  getRecipe,
} = require('../controllers/recipeController');
const isLogged = require('../middlewares/isLogged');

const router = express.Router();

router.post('/recipes', isLogged, postRecipe);
router.get('/recipes/:id', getRecipe);
router.get('/recipes', getRecipes);

module.exports = router;