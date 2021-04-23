const express = require('express');
const { checkToken, checkRecipeBody } = require('../middleware/recipesMiddleware');
const recipesController = require('../controller/recipesController');

const router = express.Router();

router.post('/recipes', checkToken, checkRecipeBody, recipesController.createRecipes);
router.get('/recipes', recipesController.getAll);
router.get('/recipes/:id',recipesController.getById);
router.put('/recipes/:id',checkRecipeBody,recipesController.update);
module.exports = router;