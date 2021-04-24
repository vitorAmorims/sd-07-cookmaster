const express = require('express');

// controllers
const { addUser } = require('../controllers/userController');
const { userLogin } = require('../controllers/userController');
const { addRecipe } = require('../controllers/userController');
const { getAllRecipes } = require('../controllers/userController');
const { getRecipe } = require('../controllers/userController');

// Esse product vai ser feito com middlewares inicialmente, depois se estiver tranquilo levar para MSC
// Middlewares
const validateUser = require('../middlewares/validateUser');
const existingEmail = require('../middlewares/existingEmail');
const validateLogin = require('../middlewares/validateLogin');
const loginExists = require('../middlewares/loginExists');
const validateRecipe = require('../middlewares/validateRecipe');
const validateToken = require('../middlewares/validateToken');
const recipeExists = require('../middlewares/recipeExists');

// rotas
const routes = express.Router();

routes.post('/users', validateUser, existingEmail, addUser);
routes.post('/login', validateLogin, loginExists, userLogin);
routes.post('/recipes', validateRecipe, validateToken, addRecipe);
routes.get('/recipes', getAllRecipes);
// o teste desta rota fala que é para ver id não existe mas testa id inválido.
routes.get('/recipes/:id', recipeExists, getRecipe);

module.exports = routes;
