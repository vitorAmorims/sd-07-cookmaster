const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const usersRoutes = express.Router();

usersRoutes.route('/users')
  .post(controller.createUserController);

usersRoutes.route('/users/admin')
  .post(middleware.jwtMiddleware, controller.createAdminController);

usersRoutes.route('/login')
  .post(controller.loginController);

usersRoutes.use(middleware.errorsMiddleware);

module.exports = usersRoutes;
