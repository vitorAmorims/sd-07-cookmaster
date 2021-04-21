const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/recipes', validateToken, recipesController.addRecipe);
router.get('/recipes', recipesController.getRecipes);

module.exports = router;
