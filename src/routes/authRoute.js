const express = require('express');
const { authMiddleware } = require('../middlewares');
const { authController } = require('../controller');

const router = express.Router();

router.use(express.json());

const BASE_URL = '/login';

router.post(BASE_URL, authMiddleware.generateToken,
            authMiddleware.generateTokenStep2,
            authController.auth);

module.exports = router;