const { Router } = require('express');
const loginService = require('../services/loginService');

const routes = Router();

routes.post('/', loginService.loginUser);

module.exports = routes;