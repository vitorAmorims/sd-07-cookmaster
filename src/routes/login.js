const routes = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { LoginMiddleware } = require('../middlewares');

routes.post('/', LoginMiddleware, AuthController.login);

module.exports = routes;
