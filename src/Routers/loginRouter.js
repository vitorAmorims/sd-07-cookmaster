const { Router } = require('express');
const { createNewLogin, getAllLogin } = require('../Controllers/loginController');

const {
  checkUser,
  validateLogin,
} = require('../Services/loginService');
// const servicesLogin = require('../services/servicesLogin');
// const servicesUsers = require('../services/servicesUsers');

const loginRouter = Router();

loginRouter.post('/', validateLogin, checkUser, createNewLogin);

loginRouter.get('/', getAllLogin);
// loginRouter.get('/:id', controllersLogin.getById);

// loginRouter.put('/:id', controllersLogin.updateById);
// loginRouter.delete('/:id', controllersLogin.excludeById);

module.exports = loginRouter;
