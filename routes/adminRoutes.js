const { Router } = require('express');
const {
    AdminMiddleware,
  } = require('../Middlewares');
  
const { createAdmin } = require('../controllers');

  const routerAdmin = Router();

routerAdmin.post(
    '/users/admin',
    AdminMiddleware,
    createAdmin,
  );

module.exports = { routerAdmin };
