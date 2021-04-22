const express = require('express');
const validateToken = require('../middlewares/validateToken');

const recipeController = require('../controllers/recipeController');

const router = express.Router();
const recipePath = '/recipes';
const byIdPath = '/:id';

router.post(`${recipePath}`, validateToken, recipeController.createRecipe);
router.get(`${recipePath}`, recipeController.getAllRecipes);
router.get(`${recipePath}${byIdPath}`, recipeController.getRecipeById);
router.put(`${recipePath}${byIdPath}`, validateToken, recipeController.updateRecipe);
router.delete(`${recipePath}${byIdPath}`, validateToken, recipeController.deleteRecipe);

module.exports = router;
