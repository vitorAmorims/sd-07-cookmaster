const express = require('express');
const loginControllers = require('../controllers/loginControllers');

const router = express.Router();

router.post('/login', loginControllers.createLogin);

module.exports = router;
