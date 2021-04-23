const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/users', usersController.createUser);

router.post('/login', usersController.createLogin);

module.exports = router;
