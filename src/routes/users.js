const routes = require('express').Router();
const UserController = require('../controllers/UserController');
const { authenticate } = require('../controllers/AuthController');
const { UserMiddleware } = require('../middlewares');

routes.post('/', UserMiddleware, UserController.create);
routes.post('/admin', authenticate, UserMiddleware, UserController.admin);

module.exports = routes;