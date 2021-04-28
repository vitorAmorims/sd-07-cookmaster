const express = require('express');
const { addRecipe, getRecipes, getRecipeById } = require('../controllers/recipesController');
const validateTokenMiddleware = require('../middlewares/validateToken');

const router = express.Router();

router.post('/recipes', validateTokenMiddleware, addRecipe);
router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);

module.exports = router;
