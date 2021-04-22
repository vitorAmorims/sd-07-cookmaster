const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/users', UserController.getAll);
router.post('/users', UserController.addUser);

module.exports = router;