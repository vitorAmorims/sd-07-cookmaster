const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

router.post('/users', usersControllers.addNewUser);

module.exports = router;
