const express = require('express');
const controller = require('../controller');
const middleware = require('../middlewares');

const router = express.Router();

const recipeURL = '/recipes';

router.post('/users',
  middleware.validationName,
  middleware.validationEmailCreate,
  middleware.validationPassword,
  controller.createUser);
router.post('/login',
  middleware.validationPasswordLogin,
  middleware.validationEmail,
  controller.login);
router.post(recipeURL,
  middleware.validationName,
  middleware.validationRecipes,
  middleware.validationToken,
  controller.createRecipe);
router.get(recipeURL, controller.getRecipes);
router.get(`${recipeURL}/:id`, middleware.recipeIdNotFound, controller.getRecipeById);
// router.put(`${recipeURL}/:id`, '');
// router.delete(`${recipeURL}/:id`, '');

module.exports = router;
