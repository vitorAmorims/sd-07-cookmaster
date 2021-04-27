const express = require('express');
const { createRecipeController, getAllRecipes } = require('../controllers/recipes');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/recipes')
  .post(validateToken, createRecipeController)
  .get(getAllRecipes);

module.exports = router;