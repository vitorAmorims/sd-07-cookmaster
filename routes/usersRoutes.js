const express = require('express');

const usersController = require('../controllers/usersController');
const middleware = require('../middlewares');

const router = express.Router();

router.post('/users',
  middleware.usersMiddleware,
  middleware.emailMiddleware,
  usersController.createUser);

module.exports = router;