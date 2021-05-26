const Router = require('express').Router();
const { register, login } = require('../controller/user');
const { userInfoTest, userEmailExists, loginInfoTest } = require('../middlewares/user');

Router.post('/users', userInfoTest, userEmailExists, register);
Router.post('/login', loginInfoTest, login);

module.exports = Router;
