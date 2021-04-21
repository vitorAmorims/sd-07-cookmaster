const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/users', usersController.registerUser);

module.exports = router;
