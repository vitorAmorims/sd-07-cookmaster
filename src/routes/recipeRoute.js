const express = require('express');

const endPoint = '/recipes';

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const recipeController = require('../controllers/recipeController');

router.post(endPoint, authMiddleware, recipeController.createRecipe);
router.get(endPoint, recipeController.getAllRecipes);
router.get(`${endPoint}/:id`, recipeController.getRecipeById);
router.put(`${endPoint}/:id`, authMiddleware, recipeController.updateRecipe);
router.delete(`${endPoint}/:id`, authMiddleware, recipeController.deleteRecipe);

module.exports = router;