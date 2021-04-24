const express = require('express');

const recipeRouter = express.Router();
const { insertNewRecipe } = require('../controller/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

recipeRouter.post('/recipes', authMiddleware, insertNewRecipe);

module.exports = recipeRouter;