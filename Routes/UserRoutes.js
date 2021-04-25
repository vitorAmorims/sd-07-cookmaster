const express = require('express');

const router = express.Router();

const { createUser, createUserAdmin } = require('../Controller/UserController');

const validateToken = require('../Middlewares/token');

  router.post('/', createUser);

  router.post('/admin', validateToken, createUserAdmin);

  module.exports = router;