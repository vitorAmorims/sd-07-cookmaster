const express = require('express');

const router = express.Router();

const { createUser, addAdmin } = require('../Controller/UserController');

const validateToken = require('../Middlewares/token');

  router.post('/', createUser);

  router.post('/admin', validateToken, addAdmin);

  module.exports = router;