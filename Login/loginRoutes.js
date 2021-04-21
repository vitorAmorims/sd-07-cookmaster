const express = require('express');
const loginControllers = require('./loginControllers');

const router = express.Router();

router.post('/login', loginControllers.makeLogin); // req. 2

module.exports = router;
