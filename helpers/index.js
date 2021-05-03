const express = require('express');
const middlewares = require('../middlewares');

const route = express.Router();

const headersMiddlewares = () => {
    route.use(middlewares.validationFields);
    route.use(middlewares.validationLogin);
    return route;
};

module.exports = headersMiddlewares;