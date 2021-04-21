const express = require('express');
const userController = require('../controllers/UsersController');
const middlewareUser = require('../middlewares/UsersMiddlewares');

const login = express.Router();

login.post('/login', [middlewareUser.login], userController.login);

module.exports = login;
