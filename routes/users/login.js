const route = require('express').Router();
const { emptyData } = require('../../middlewares/users');
const { logUser } = require('../../controllers/users');

route.post('/', emptyData, logUser);

module.exports = route;