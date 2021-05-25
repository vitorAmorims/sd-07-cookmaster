const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const usersRoutes = express.Router();

usersRoutes.route('/users')
  .post(controller.userController.createUserController);

// usersRoutes.route('/login')
//   .post(middleware.userInfoMiddleware, controller.userController.loginController);

usersRoutes.use(middleware.errorsMiddleware);

module.exports = usersRoutes;
