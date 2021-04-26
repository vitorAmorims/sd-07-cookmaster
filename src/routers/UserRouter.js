const express = require('express');
const UserController = require('../controllers/UserController');
const middleware = require('../middlewares');
const tokenMiddleware = require('../auth/tokenMiddleware');
const jwtValidation = require('../auth/jwtValidation');

const router = express.Router();

router.post('/users', middleware.attributeMiddleware, UserController.create);

router.post('/users/admin', middleware.attributeMiddleware,
  jwtValidation, UserController.createAdmin);

router.post('/login', middleware.loginMiddleware, tokenMiddleware);

router.use(middleware.errorMiddleware);

module.exports = router;
