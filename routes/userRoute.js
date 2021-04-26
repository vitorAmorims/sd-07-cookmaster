const express = require('express');
const userControllers = require('../controllers/userControllers');
const userMiddewares = require('../middlewares/userMiddlewares');

const router = express.Router();

router.post('/users', userMiddewares.validateName,
userMiddewares.validateEmail, userMiddewares.validatePassword, userControllers.registerUser);

module.exports = router;