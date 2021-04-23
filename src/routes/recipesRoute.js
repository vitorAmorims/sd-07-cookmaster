const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/recipes', authMiddleware, rescue(recipesController.createRecipe));
router.get('/recipes', rescue(recipesController.getAllRecipes));
router.get('/recipes/:id', rescue(recipesController.getRecipeById));
router.put('/recipes/:id', rescue(recipesController.updateRecipe));

module.exports = router;
