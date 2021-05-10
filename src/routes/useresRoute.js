const express = require('express');

const { userControllers } = require('../controllers');

const route = express.Router();

route.post('/users', userControllers.creatUser);

module.exports = route;
