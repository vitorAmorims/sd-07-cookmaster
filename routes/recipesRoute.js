const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

const PATH = '/recipes/:id';

router.get('/recipes', recipesController.getAllRecipes);
router.get(PATH, recipesController.findByIdRecipes);
router.post('/recipes', [validateToken, recipesController.registerRecipes]);
router.put(PATH, [validateToken, recipesController.updateRecipes]);
router.delete(PATH, [validateToken, recipesController.deleteRecipe]);

module.exports = router;
