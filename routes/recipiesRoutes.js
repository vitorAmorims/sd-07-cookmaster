const express = require('express');
const recipesController = require('../controllers/recipiesController');
const validateToken = require('../middlewares/validToken');

const router = express.Router();

router.post('/recipes', validateToken, recipesController.addrecipe);
router.get('/recipes', recipesController.getAllRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);

module.exports = router;