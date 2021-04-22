const { Router } = require('express');

const { insertUserCtrl } = require('../src/controller');

const userRoutes = Router();

userRoutes.post('/', insertUserCtrl);

module.exports = userRoutes;
