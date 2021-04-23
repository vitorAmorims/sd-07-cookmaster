const express = require('express');
const usersController = require('../controllers/usersController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/users', usersController.addUser);
router.post('/users/admin', validateToken, usersController.addAdmin);
router.post('/login', usersController.userLogin);

module.exports = router;
