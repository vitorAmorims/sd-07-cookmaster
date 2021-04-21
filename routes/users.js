const express = require('express');
const userController = require('../controllers/UsersController');
const middlewareUser = require('../middlewares/UsersMiddlewares');
const auth = require('../middlewares/AuthMiddleware');

const users = express.Router();

users.post('/users', [middlewareUser.existAllFields], userController.add);
users.post('/users/admin', [auth.onlyAdmin], userController.addAdmin);

module.exports = users;
