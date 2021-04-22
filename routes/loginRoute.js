const { Router } = require('express');

const { loginCtrl } = require('../src/controller');

const loginRoute = Router();

loginRoute.post('/', loginCtrl);

module.exports = loginRoute;
