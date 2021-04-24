const express = require('express');

const userRouter = express.Router();
const { insertNewUser } = require('../controller/userController');

userRouter.post('/users', insertNewUser);

module.exports = userRouter;