const express = require('express');
const { createUser } = require('../controller/usersController');
const { validateUserFields } = require('../middlewares/validates');

const router = express.Router();

router.post('/users', validateUserFields, createUser);

module.exports = router;
