const express = require('express');
const userControllers = require('./userControllers');

const router = express.Router();

router.post('/users', userControllers.createUser); // req. 1

module.exports = router;
