const express = require('express');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');
const recipesController = require('../controllers/recipesController');
const tokenValidate = require('../auth/validateToken');

const recipe = '/recipes/:id';
const router = express.Router();

// router.get('/users', userController.getAllUsers);
router.post('/users', userController.registerUser);
router.post('/login', loginController.loginUser);

router.get('/recipes', recipesController.getAllRecipes);
router.get(recipe, recipesController.getById);
router.post('/recipes', tokenValidate, recipesController.createRecipes);
router.put(recipe, tokenValidate, recipesController.updateRecipes);
router.delete(recipe, tokenValidate, recipesController.deleteRecipe);

module.exports = router;
