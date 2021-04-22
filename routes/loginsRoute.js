const express = require('express');
const loginsControllers = require('../controllers/loginsControllers');

const router = express.Router();

router.post('/login', loginsControllers.addNewToken);

module.exports = router;
