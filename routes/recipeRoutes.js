const express = require('express');
const recipeControllers = require('../controllers/recipeControllers');
const { auth, especificAuth } = require('../middlewares/userMiddlewares');

const router = express.Router();

router.get('/recipes', recipeControllers.getAllRecipes);
router.get('/recipes/:id', recipeControllers.getRecipeById);
router.post('/recipes', auth, recipeControllers.createRecipe);
router.put('/recipes/:id', especificAuth, recipeControllers.updateRecipe);
router.delete('/recipes/:id', especificAuth, recipeControllers.deleteRecipe);

module.exports = router;
