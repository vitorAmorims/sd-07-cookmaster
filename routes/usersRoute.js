const { Router } = require('express');
const { controllersUsers, controllersLogin } = require('../controllers');
const { userMiddleware, loginMiddleware } = require('../middlewares');

const userRoute = Router();

userRoute.post('/users', userMiddleware, controllersUsers.addNewUser);
userRoute.post('/login', loginMiddleware, controllersLogin.signIn);

module.exports = userRoute;
