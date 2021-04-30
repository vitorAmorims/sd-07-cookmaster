const express = require('express');
const { login } = require('../controller/loginController');
const { validateLoginFields, validatePass } = require('../middlewares/validates');

const router = express.Router();

router.post('/login', [validateLoginFields, validatePass], login);

module.exports = router;
