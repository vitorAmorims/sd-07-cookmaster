const express = require('express');
const recipeController = require('../controllers/recipeController');
const { validateToken, validateRecipe } = require('../middlewares');

const router = express.Router();

router.post('/recipes', validateToken, validateRecipe, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipe);
// router.put('/recipe/:id', validateToken, recipeController);
// router.delete('/recipe/:id', validateToken, recipeController);

module.exports = router;