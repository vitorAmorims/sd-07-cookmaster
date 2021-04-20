const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/users', usersController.createUsers);

module.exports = router;