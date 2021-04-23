const express = require('express');
const UserController = require('../Controllers/UserController');

const router = express.Router();

router.post('/users', UserController.addUser);

module.exports = router;