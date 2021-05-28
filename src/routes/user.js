const Router = require('express').Router();
const { register, login, adminRegister } = require('../controller/user');
const { userInfoTest, userEmailExists, loginInfoTest } = require('../middlewares/user');
const { tokenValidation, tokenExists } = require('../middlewares/recipes');

Router.post('/users', userInfoTest, userEmailExists, register);
Router.post('/login', loginInfoTest, login);
Router.post('/users/admin', tokenExists, tokenValidation, adminRegister);

module.exports = Router;
