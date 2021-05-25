const express = require('express');

const user = require('../controller/users');

const userRoute = express.Router();

userRoute.post('/', user.addUser);

module.exports = userRoute;