const express = require('express');
const userController = require('../controllers/UsersController');
const middlewareUser = require('../middlewares/UsersMiddlewares');

const users = express.Router();

users.post('/users', [middlewareUser.existAllFields], userController.add);

module.exports = users;
