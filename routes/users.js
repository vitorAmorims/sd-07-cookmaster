const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const userRouter = express.Router();

userRouter.route('/')
  .post(middleware.validation.user, controller.users.create);

userRouter.use(middleware.errorHandler);

module.exports = userRouter;