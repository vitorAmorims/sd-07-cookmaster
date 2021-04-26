const express = require('express');
const loginControllers = require('../controllers/loginControllers');
const loginMiddewares = require('../middlewares/loginMiddlewares');

const router = express.Router();

router.post('/login', loginMiddewares.validateEmail, 
loginMiddewares.validatePassword, loginControllers.effectLogin);

module.exports = router;