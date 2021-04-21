const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUsers);
router.post('/users/admin', userController.addAdmin);

module.exports = router;