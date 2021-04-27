const express = require('express');

const loginController = require('../controllers/loginController');
// const middleware = require('../middlewares');

const router = express.Router();

router.post('/login', loginController.login);

module.exports = router;