const { Router } = require('express');
const loginService = require('../services/loginService');
const { loginValidations } = require('../middlewares/loginMiddleware');

const routes = Router();

routes.post('/', loginValidations, loginService.loginUser);

module.exports = routes;