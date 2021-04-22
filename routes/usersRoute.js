const express = require('express');
const { registerUser } = require('../controllers/usersController');
const { userLogin } = require('../controllers/loginController');
const { loginMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/users', registerUser);
router.post('/login', loginMiddleware, userLogin);

module.exports = router;
