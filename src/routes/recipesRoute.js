const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/recipes')
  .get(recipesController.getAllRecipes)
  .post(validateJWT, recipesController.createRecipe);

module.exports = router;