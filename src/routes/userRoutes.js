const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/users', userController.add);

router.post('/login', userController.login);

module.exports = router;
