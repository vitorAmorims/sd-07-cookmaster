const { Router } = require('express');
const { controllersUsers, controllersLogin } = require('../controllers');
const { userMiddleware, loginMiddleware, authMiddleware } = require('../middlewares');

const userRoute = Router();

userRoute.post('/users', userMiddleware.dataUserInsertCheck, controllersUsers.addNewUser);
userRoute.post(
  '/users/admin',
  authMiddleware,
  userMiddleware.dataAdminInsertCheck,
  controllersUsers.addNewUser,
);
userRoute.post('/login', loginMiddleware, controllersLogin.signIn);

module.exports = userRoute;
