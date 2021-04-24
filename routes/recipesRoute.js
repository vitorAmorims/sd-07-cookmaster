const express = require('express');
const { recipesController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const route = express.Router();

// (_, res) => { res.send('deu bom'); }
route.post('/recipes', authMiddleware.checkIfTheUserIsAuthenticated,
  recipesController.recipesRegistration);

module.exports = route;
