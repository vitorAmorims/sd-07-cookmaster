const { Router } = require('express');
const {  } = require('../controllers');
const {  } = require('../middlewares');

const userRoute = Router();

userRoute.post('/users', userMiddleware, controllersUsers.addNewUser);
userRoute.post('/login', loginMiddleware, controllersLogin.signIn);

module.exports = userRoute;
