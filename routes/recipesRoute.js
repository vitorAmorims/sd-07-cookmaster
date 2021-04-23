const express = require('express');
const recipesControllers = require('../controllers/recipesControllers');
const authorizationToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/recipes', authorizationToken, recipesControllers.addNewRecipe);
router.get('/recipes', recipesControllers.getAllRecipes);
router.get('/recipes/:id', recipesControllers.getRecipesById);
// router.put('/recipes/:id', recipesControllers.changeRecipes);

module.exports = router;
