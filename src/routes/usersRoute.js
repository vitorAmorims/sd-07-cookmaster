const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/users', rescue(usersController.createUser));
router.post('/users/admin', authMiddleware, rescue(usersController.createAdmin));

module.exports = router;
