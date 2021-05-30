const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/users', rescue(usersController.createUser));
router.post('/users/admin', authorizationMiddleware, rescue(usersController.createAdm));

module.exports = router;
