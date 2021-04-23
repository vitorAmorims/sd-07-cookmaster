const express = require('express');
const multer = require('multer');

const app = express.Router();

const recipeMiddleware = require('../middlewares/recipeMiddleware');
const recipesCreateMiddleware = require('../middlewares/recipesCreateMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const recipesController = require('../controllers/recipesController');
const authMiddlewareRecipes = require('../middlewares/authMiddlewareRecipes');
const storageMiddleware = require('../middlewares/storageMiddleware');

const storage = storageMiddleware;
const upload = multer({ storage });

app.post(
  '/',
  authMiddleware,
  recipesCreateMiddleware,
  recipesController.createRecipes,
);

app.get('/', recipesController.getAllRecipes);
app.get('/:id', recipeMiddleware, recipesController.getRecipe);
app.put('/:id', authMiddlewareRecipes, recipesController.updateRecipe);
app.delete('/:id', authMiddlewareRecipes, recipesController.deleteRecipe);
app.post(
  '/:id/image/',
  authMiddlewareRecipes,
  upload.single('image'),
  recipesController.insertImageRecipe,
);

module.exports = app;
