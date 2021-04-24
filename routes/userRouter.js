const express = require('express');

// controllers
const { addUser } = require('../controllers/userController');
const { userLogin } = require('../controllers/userController');

// Esse product vai ser feito com middlewares inicialmente, depois se estiver tranquilo levar para MSC
// Middlewares
const validateUser = require('../middlewares/validateUser');
const existingEmail = require('../middlewares/existingEmail');
const validateLogin = require('../middlewares/validateLogin');
const loginExists = require('../middlewares/loginExists');

// rotas
const routes = express.Router();

routes.post('/users', validateUser, existingEmail, addUser);
routes.post('/login', validateLogin, loginExists, userLogin);

module.exports = routes;
