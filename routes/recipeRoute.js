const express = require('express');

const router = express.Router();

const {
  verifyRecipe,
} = require('../middleware/recipeMiddleware');

const {
  validationAuthToken,
} = require('../services/authService');

const { 
  addRecipe,
  getAll,
} = require('../controllers/recipeController');

router.post('/recipes', verifyRecipe, validationAuthToken, addRecipe);
router.get('/recipes', getAll);

module.exports = router;