const express = require('express');

const { 
  checkToken,
  checkRecipeBody,
  checkTokenToUpdade, 
} = require('../middleware/recipesMiddleware');

const recipesController = require('../controller/recipesController');

const router = express.Router();

router.post('/recipes', checkToken, checkRecipeBody, recipesController.createRecipes);
router.get('/recipes', recipesController.getAll);
router.get('/recipes/:id', recipesController.getById);
router.put('/recipes/:id', checkTokenToUpdade, checkRecipeBody, recipesController.update);
module.exports = router;