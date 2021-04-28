const express = require('express');

const router = express.Router();

const recipeIdRouth = '/recipes/:id';

const {
  verifyRecipe,
} = require('../middleware/recipeMiddleware');

const {
  validationAuthToken,
} = require('../services/authService');

const { 
  addRecipe,
  getAllRecipe,
  getByIdRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

router.post('/recipes', verifyRecipe, validationAuthToken, addRecipe);
router.get('/recipes', getAllRecipe);
router.get(recipeIdRouth, getByIdRecipe);
router.put(recipeIdRouth, validationAuthToken, updateRecipe);
router.delete(recipeIdRouth, validationAuthToken, deleteRecipe);

module.exports = router;