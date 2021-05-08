const express = require('express');

const router = express.Router();

const { userMiddleware } = require('../middlewares');
const { userSchema } = require('../schemas');
const { userController } = require('../controllers');

router.post('/users', userSchema, userMiddleware, userController.createUser);

module.exports = router;