const express = require('express');
const { addUser, loginUser } = require('../controllers/usersController');

const router = express.Router();

router.post('/users', addUser);
router.post('/login', loginUser);

module.exports = router;
