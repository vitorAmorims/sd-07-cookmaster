const express = require('express');
const { addNewUser, login } = require('../controllers/userController');

const userRouters = express.Router();

userRouters.post('/', addNewUser);
userRouters.post('/login', login);

module.exports = userRouters;