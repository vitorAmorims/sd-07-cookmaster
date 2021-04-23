const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const endpointWithId = '/recipes/:id';

router.post('/recipes', authMiddleware, rescue(recipesController.createRecipe));
router.get('/recipes', rescue(recipesController.getAllRecipes));
router.get(endpointWithId, rescue(recipesController.getRecipeById));
router.put(endpointWithId, authMiddleware, rescue(recipesController.updateRecipe));
router.delete(endpointWithId, authMiddleware, rescue(recipesController.deleteRecipe));

module.exports = router;
