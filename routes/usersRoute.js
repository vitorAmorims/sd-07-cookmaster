const express = require('express');
const { registerUser, registerAdmin } = require('../controllers/usersController');
const { userLogin } = require('../controllers/loginController');
const { loginMiddleware, tokenMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/users', registerUser);
router.post('/users/admin', tokenMiddleware, registerAdmin);
router.post('/login', loginMiddleware, userLogin);

module.exports = router;
