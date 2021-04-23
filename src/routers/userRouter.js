const express = require('express');

const { usersMiddleware, recipesMiddleware } = require('../middlewares');
const { validateToken } = recipesMiddleware;
const { validateEmailOrPasswordIsValid } = usersMiddleware;
const { usersController } = require('../controllers');
const {
  createUser,
  readAllUsers,
  createLoginToken,
  readUserById,
  createUserAdmin,
} = usersController;

const Users = express.Router();

Users.post('/users', createUser);

Users.post('/users/admin', validateToken, createUserAdmin);

Users.post('/login', validateEmailOrPasswordIsValid, createLoginToken);

Users.get('/users', readAllUsers);

Users.get('/users/:id', readUserById);

module.exports = Users;
