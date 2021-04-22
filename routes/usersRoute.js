const express = require('express');
const usersController = require('../controllers/usersControllers');

const router = express.Router();

router.post('/users', usersController.createUser);

router.post('/users/login', usersController.createLogin);

module.exports = router;
