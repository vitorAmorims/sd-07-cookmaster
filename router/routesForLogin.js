const { Router } = require('express');
const login = require('../controller/login');
const middleware = require('../middleware');

const route = Router();

route.post('/', middleware.errorMiddleware, login.userAccess);

module.exports = route;           