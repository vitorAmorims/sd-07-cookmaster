const express = require('express');
const { userControllers } = require('../controllers');

const route = express.Router();

route.post('/login', userControllers.userLogin);

module.exports = route;
