const express = require('express');
const UserController = require('../Controllers/UserController');

const router = express.Router();

router.post('/users', UserController.addUser);
router.post('/login', UserController.login);

module.exports = router;