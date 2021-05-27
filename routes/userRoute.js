const express = require('express');
const usersController = require('../controllers/userController');

const router = express.Router();

router.post('/users', usersController.userCreate);

module.exports = router;