const express = require('express');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');
const recipesController = require('../controllers/recipesController');
const tokenValidate = require('../auth/validateToken');

const router = express.Router();

// router.get('/users', userController.getAllUsers);
router.post('/users', userController.registerUser);
router.post('/login', loginController.loginUser);

router.get('/recipes', recipesController.getAllRecipes);
router.get('/recipes/:id', recipesController.getById);
router.post('/recipes', tokenValidate, recipesController.createRecipes);

module.exports = router;
