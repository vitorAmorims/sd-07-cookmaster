const express = require('express');
const { authMiddleware } = require('../middlewares');
const { recipesController } = require('../controllers');

const route = express.Router();

// (_, res) => { res.send('deu bom'); }
route.post('/recipes', authMiddleware.checkIfTheUserIsAuthenticated,
  recipesController.recipesRegistration);
route.get('/recipes', recipesController.getAllRecipes);

module.exports = route;
