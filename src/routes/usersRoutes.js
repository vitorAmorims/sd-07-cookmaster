const express = require('express');
const { createUser, loginHandler } = require('../controllers/usersController');

const route = express.Router();

route.post('/users', createUser);
route.post('/login', loginHandler);

module.exports = route;
