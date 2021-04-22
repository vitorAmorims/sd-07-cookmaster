const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.get('/recipes', recipesController.getAllRecipes);
router.get('/recipes/:id', recipesController.findByIdRecipes);
router.post('/recipes', [validateToken, recipesController.registerRecipes]);
router.put('/recipes/:id', [validateToken, recipesController.updateRecipes]);

module.exports = router;
