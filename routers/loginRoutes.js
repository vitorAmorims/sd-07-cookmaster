const express = require('express');
const { loginSchema } = require('../schemas');

const { loginMiddleware } = require('../middlewares');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/login', loginSchema, loginMiddleware, loginController.getToken);

module.exports = router;