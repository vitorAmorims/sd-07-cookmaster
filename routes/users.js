const express = require('express');
const { userController } = require('../controllers');

const userRouter = express.Router();

userRouter.route('/')
  .post(userController.create);

userRouter.route('/admin')
  .post(userController.adminCreate);

module.exports = userRouter;
