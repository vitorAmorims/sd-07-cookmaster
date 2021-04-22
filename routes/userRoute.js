const express = require('express');
const userController = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/users', userController.createUser);
router.post('/users/admin', validateToken, userController.createAdmin);

module.exports = router;
