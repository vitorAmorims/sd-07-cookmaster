const express = require('express');
const userControllers = require('./userControllers');

const router = express.Router();

router.post('/users', userControllers.createUser);

module.exports = router;
