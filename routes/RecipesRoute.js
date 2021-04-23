const express = require('express');
const rescue = require('express-rescue');
const RecipesController = require('../controllers/RecipesController');
const {
  recipesValidate,
  tokenValidate,
  idRecipeValidate,
} = require('../middlewares');

const router = express.Router();

router.post('/recipes', recipesValidate, tokenValidate, rescue(RecipesController.create));
router.put('/recipes/:id', recipesValidate, tokenValidate, rescue(RecipesController.update));
router.get('/recipes/:id', idRecipeValidate, rescue(RecipesController.getById));
router.get('/recipes', rescue(RecipesController.getAll));

module.exports = router;
