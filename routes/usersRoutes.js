const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const usersRoutes = express.Router();

usersRoutes.route('/users')
  .post(middleware.userInfoMiddleware, controller.userController.createUserController);

usersRoutes.use(middleware.errorsMiddleware);

module.exports = usersRoutes;
