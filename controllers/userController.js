const { Router } = require('express');
const userService = require('../services/userService');
const { userValidations } = require('../middlewares/userMiddleware');

const routes = Router();

routes.post('/', userValidations, userService.addUser);

module.exports = routes;