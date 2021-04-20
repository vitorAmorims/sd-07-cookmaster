const express = require('express');
const { addNewUser } = require('../controllers/userController');

const userRouters = express.Router();

userRouters.post('/', addNewUser);

module.exports = userRouters;