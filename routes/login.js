const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const loginRouter = express.Router();

loginRouter.route('/')
  .post(middleware.validation.login, controller.login);

loginRouter.use(middleware.errorHandler);

module.exports = loginRouter;
