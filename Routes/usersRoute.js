const express = require('express');
const users = require('../Controllers/usersController');
const { userValidationMidd } = require('../Middlewares/userValidationMidd');

const router = express.Router();

router.post('/users', userValidationMidd, users.createUser);

module.exports = router;