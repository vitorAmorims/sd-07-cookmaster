const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/users', userMiddleware.checkUser, userController.createUser);

module.exports = router;
