const express = require('express');
const recipeControllers = require('../controllers/recipeControllers');

const router = express.Router();

router.get('/recipes', recipeControllers.getAllrecipes);
router.get('/recipes/:id', recipeControllers.getrecipeById);
router.post('/recipes', recipeControllers.createrecipe);
router.put('/recipes/:id', recipeControllers.updaterecipe);
router.delete('/recipes/:id', recipeControllers.deleterecipe);

module.exports = router;
