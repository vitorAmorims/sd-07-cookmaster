const express = require('express');

const app = express.Router();

const recipeMiddleware = require('../middlewares/recipeMiddleware');
const recipesCreateMiddleware = require('../middlewares/recipesCreateMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const recipesController = require('../controllers/recipesController');
const authMiddlewareRecipes = require('../middlewares/authMiddlewareRecipes');

app.post('/', authMiddleware, recipesCreateMiddleware, recipesController.createRecipes);
app.get('/', recipesController.getAllRecipes);
app.get('/:id', recipeMiddleware, recipesController.getRecipe);
app.put('/:id', authMiddlewareRecipes, recipesController.updateRecipe);

module.exports = app;
