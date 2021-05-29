const express = require('express');
const UserController = require('../../controllers/UserController');
// const tokenMiddleware = require('../auth/tokenMiddleware');
const jwtValidation = require('../../auth/ValidateJWT');

const router = express.Router();

router.post('/users', UserController.createUser);

router.post('/login', UserController.login);
router.post('/users/admin', jwtValidation, UserController.createAdmin);

// router.use(middleware.errorMiddleware);

module.exports = router;