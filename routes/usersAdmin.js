const express = require('express');

const tokenMiddleware = require('../middlewares/tokenAuth');
const user = require('../controller/usersAdmin');

const userRoute = express.Router();

userRoute
  .post('/', user.addUser)
  .post('/admin', tokenMiddleware, user.addAdmin);

module.exports = userRoute;