const express = require('express');
const usersController = require('../../controllers/usersController');
const loginController = require('../../controllers/loginController');
const recipeController = require('../../controllers/recipesController');
const { validateToken, validateTokenPut } = require('../auth/validateToken');

const routerRecipeId = '/recipes/:id';

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
  routerRecipeId,
  recipeController.getRecipeById,
);

router.put(
  routerRecipeId,
  recipesName,
  recipesIngredients,
  recipesPreparation,
  validateTokenPut,
  recipeController.updateRecipe,
);

router.delete(
  routerRecipeId,
  validateTokenPut,
  recipeController.deleteProduct,
);

module.exports = router;
