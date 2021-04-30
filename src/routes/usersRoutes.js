const express = require('express');
const { createUser } = require('../controllers/usersController');

const route = express.Router();

route.post('/users', createUser);

module.exports = route;
