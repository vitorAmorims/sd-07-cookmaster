const express = require('express');
const { createUser, createAdmin, loginHandler } = require('../controllers/usersController');
const isAdmin = require('../middlewares/isAdmin');
const isLogged = require('../middlewares/isLogged');

const route = express.Router();

route.post('/users', createUser);
route.post('/users/admin', isLogged, isAdmin, createAdmin);
route.post('/login', loginHandler);

module.exports = route;
