const express = require('express');

const recipesController = require('../controllers/recipesController');
const middleware = require('../middlewares');

const router = express.Router();

router.post('/recipes',
  middleware.authMiddleware,
  middleware.recipesMiddleware,
  recipesController.createRecipe);

module.exports = router;