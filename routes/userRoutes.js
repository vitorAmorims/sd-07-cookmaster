const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.post('/login', userController.login);

module.exports = router;
