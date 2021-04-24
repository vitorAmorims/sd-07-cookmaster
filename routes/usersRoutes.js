const express = require('express');
const usersController = require('../controllers/usersController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/users', middlewares.validateUser, usersController.addUser);
router.post('/login', middlewares.validateLogin, usersController.login);

router.use(middlewares.errorMiddleware);

module.exports = router;