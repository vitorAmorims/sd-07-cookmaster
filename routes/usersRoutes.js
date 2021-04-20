const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/users', usersController.addUser);
router.post('/login', usersController.userLogin);

module.exports = router;
