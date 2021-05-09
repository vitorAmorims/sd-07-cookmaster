const { Router } = require('express');
const { controllersUsers } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRoute = Router();

userRoute.post('/users', userMiddleware, controllersUsers.addNewUser);

module.exports = userRoute;
