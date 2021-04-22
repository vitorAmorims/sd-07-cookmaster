const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');

const router = express.router();

router.post('/users', rescue(usersController.createUser));

module.exports = router;
