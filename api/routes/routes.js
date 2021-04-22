const express = require('express');
const usersController = require('../../controllers/usersController');
const loginController = require('../../controllers/loginController');
const recipeController = require('../../controllers/recipesController');
const validateToken = require('../auth/validateToken');

const {
  validationName,
  validationPassword,
  validationEmail,
} = require('../../middleware/userValidation');

const {
  loginPassword,
  loginEmail,
} = require('../../middleware/loginValidation');

const {
  recipesName,
  recipesIngredients,
  recipesPreparation,
} = require('../../middleware/recipesValidation');

const router = express.Router();

router.post(
  '/users',
  validationName,
  validationPassword,
  validationEmail,
  usersController.createUsers,
);

router.post(
  '/login',
  loginPassword,
  loginEmail,
  loginController.login,
);

router.post(
  '/recipes',
  recipesName,
  recipesIngredients,
  recipesPreparation,
  validateToken,
  recipeController.createRecipe,
);

router.get(
  '/recipes',
  recipeController.getAllRecipes,
);

router.get(
  '/recipes/:id',
  recipeController.getRecipeById,
);

module.exports = router;
