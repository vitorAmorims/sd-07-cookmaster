const { Router } = require('express');
const { body } = require('express-validator');
const login = require('../controller/login');

const route = Router();

route.post('/', login.userAccess);

module.exports = route;           