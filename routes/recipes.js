const express = require('express');
const { createRecipeController,
  getAllRecipes,
  getRecipeById,
 } = require('../controllers/recipes');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/recipes')
  .post(validateToken, createRecipeController)
  .get(getAllRecipes);

router.route('/recipes/:id')
  .get(getRecipeById);

module.exports = router;