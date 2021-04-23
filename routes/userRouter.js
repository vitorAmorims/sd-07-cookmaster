const express = require('express');

// controllers
const { addUser } = require('../controllers/userController');

// Esse product vai ser feito com middlewares inicialmente, depois se estiver tranquilo levar para MSC
// Middlewares
const validateUser = require('../middlewares/validateUser');
const existingEmail = require('../middlewares/existingEmail');

// rotas
const routes = express.Router();

routes.post('/users', validateUser, existingEmail, addUser);

module.exports = routes;
