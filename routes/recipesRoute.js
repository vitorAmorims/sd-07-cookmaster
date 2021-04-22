const express = require('express');

const app = express.Router();

const recipeMiddleware = require('../middlewares/recipeMiddleware');
const recipesCreateMiddleware = require('../middlewares/recipesCreateMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const recipesController = require('../controllers/recipesController');
const authMiddlewareRecipes = require('../middlewares/authMiddlewareRecipes');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

app.post(
  '/',
  authMiddleware,
  recipesCreateMiddleware,
  recipesController.createRecipes,
);

app.use(express.static(`${__dirname}/images/`));
app.get('/', recipesController.getAllRecipes);
app.get('/:id', recipeMiddleware, recipesController.getRecipe);
app.put('/:id', authMiddlewareRecipes, recipesController.updateRecipe);
app.delete('/:id', authMiddlewareRecipes, recipesController.deleteRecipe);
app.put(
  '/:id/image/',
  uploadMiddleware,
  recipesController.insertImageRecipe,
);

module.exports = app;
