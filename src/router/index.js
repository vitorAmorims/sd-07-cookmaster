const express = require('express');
const controller = require('../controller');
const middleware = require('../middlewares');

const router = express.Router();

// const recipeIdURL = '/recipes/:id';

router.post('/users',
  middleware.validationName,
  middleware.validationEmailCreate,
  middleware.validationPassword,
  controller.createUser);
router.post('/login',
  middleware.validationPasswordLogin,
  middleware.validationEmail,
  controller.login);
router.post('/recipes',
  middleware.validationName,
  middleware.validationRecipes,
  middleware.validationToken,
  controller.createRecipe);
// router.get('/recipes', '');
// router.get(recipeIdURL, '');
// router.put(recipeIdURL, '');
// router.delete(recipeIdURL, '');

module.exports = router;
