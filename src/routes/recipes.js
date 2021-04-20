const routes = require('express').Router();
const RecipeController = require('../controllers/RecipeController');
const { RecipeMiddleware } = require('../middlewares');
const { authenticate } = require('../controllers/AuthController');

routes.get('/', RecipeController.index);
routes.get('/:id', RecipeController.get);
routes.put('/:id', authenticate, RecipeMiddleware, RecipeController.update);
routes.delete('/:id', authenticate, RecipeController.delete);
routes.post('/', authenticate, RecipeMiddleware, RecipeController.create);

module.exports = routes;
