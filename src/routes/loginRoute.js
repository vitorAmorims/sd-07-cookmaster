const express = require('express');
const { login } = require('../controllers/userController');

const loginRouters = express.Router();

loginRouters.post('/', login);

module.exports = loginRouters;