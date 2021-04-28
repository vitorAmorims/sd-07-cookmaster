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
  getById,
  update,
} = require('../controllers/recipeController');

router.post('/recipes', verifyRecipe, validationAuthToken, addRecipe);
router.get('/recipes', getAll);
router.get('/recipes/:id', getById);
router.put('/recipes/:id', validationAuthToken, update);

module.exports = router;