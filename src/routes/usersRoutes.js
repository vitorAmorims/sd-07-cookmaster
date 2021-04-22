const express = require('express');
const { newUser } = require('../controllers/usersControllers');

const router = express.Router();

router.post('/users', newUser);

module.exports = router;
