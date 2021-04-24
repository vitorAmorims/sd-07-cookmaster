const express = require('express');

const userRouter = express.Router();
const { insertNewUser, loginUser } = require('../controller/userController');

userRouter.post('/users', insertNewUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;