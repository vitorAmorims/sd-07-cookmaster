const { Router } = require('express');
const userService = require('../services/userService');

const routes = Router();

routes.post('/', userService.addUser);

module.exports = routes;