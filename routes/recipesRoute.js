const express = require('express');
const validateTokenMiddleware = require('../middlewares/validateToken');
const {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipesController');

const recipesIdRoute = '/recipes/:id';

const router = express.Router();

router.post('/recipes', validateTokenMiddleware, addRecipe);
router.get('/recipes', getRecipes);
router.get(recipesIdRoute, getRecipeById);
router.put(recipesIdRoute, validateTokenMiddleware, updateRecipe);
router.delete(recipesIdRoute, validateTokenMiddleware, deleteRecipe);

module.exports = router;
