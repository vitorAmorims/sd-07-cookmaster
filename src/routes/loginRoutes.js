const express = require('express');
const { handleLogin } = require('../controllers/loginControllers');

const router = express.Router();

router.post('/login', handleLogin);

module.exports = router;
