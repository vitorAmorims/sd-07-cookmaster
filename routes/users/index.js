const route = require('express').Router();
const { verifyData, consultEmail } = require('../../middlewares/users');
const { createUser } = require('../../controllers/users');

route.post('/', verifyData, consultEmail, createUser);

module.exports = route;