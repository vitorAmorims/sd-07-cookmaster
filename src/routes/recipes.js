const routes = require('express').Router();
const RecipeController = require('../controllers/RecipeController');
const { RecipeMiddleware } = require('../middlewares');
const { authenticate } = require('../controllers/AuthController');

routes.get('/', RecipeController.index);
routes.get('/:id', RecipeController.get);
routes.post('/', authenticate, RecipeMiddleware, RecipeController.create);

module.exports = routes;
