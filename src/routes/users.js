const routes = require('express').Router();
const UserController = require('../controllers/UsserController');
const { UserMiddleware } = require('../middlewares');

routes.post('/', UserMiddleware, UserController.create);

module.exports = routes;
