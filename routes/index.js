const express = require('express');
const { userRoute } = require('./users');

const route = express.Router();

route.use('/users', userRoute);

module.exports = route; 
