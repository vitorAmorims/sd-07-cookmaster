const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const usersRoutes = express.Router();

usersRoutes.route('/')
  .post(middleware.userInfoMiddleware);

userRouter.use(middleware.errorsMiddleware);

module.exports = usersRoutes;