const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/recipes', [validateToken, recipesController.registerRecipes]);

module.exports = router;
