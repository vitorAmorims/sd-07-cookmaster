const routes = require('express').Router();
const UserController = require('../controllers/UserController');
const { UserMiddleware } = require('../middlewares');

routes.post('/', UserMiddleware, UserController.create);

module.exports = routes;