const { Router } = require('express');

const routes = Router();

routes.get('/test', (request, response) => response.status(200).send('ok'));

module.exports = routes;