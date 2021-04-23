const express = require('express');

const { usersMiddleware } = require('../middlewares');
const { validateEmailOrPasswordIsValid } = usersMiddleware;
const { usersController } = require('../controllers');
const { createUser, readAllUsers, createLoginToken, readUserById } = usersController;

const Users = express.Router();

Users.post('/users', createUser);

Users.post('/login', validateEmailOrPasswordIsValid, createLoginToken);

Users.get('/users', readAllUsers);

Users.get('/users/:id', readUserById);

module.exports = Users;
