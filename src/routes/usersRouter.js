const express = require('express');

const router = express.Router();
const middleares = require('../middlewares');
const users = require('../controllers/userController');

router.post('/users',
    middleares.checkFieldsMiddleares,
    middleares.checkFormatEmail,
    users.createUser);

router.post('/login',
    middleares.checkFieldsLogin,
    users.loginUser);

module.exports = router;