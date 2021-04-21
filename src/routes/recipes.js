const routes = require('express').Router();
const multer = require('multer');

const RecipeController = require('../controllers/RecipeController');
const { RecipeMiddleware, ImageMiddleware } = require('../middlewares');
const { authenticate } = require('../controllers/AuthController');
const multerConfig = require('../config/multer');

const upload = multer(multerConfig);

routes.put('/:id/image', authenticate, ImageMiddleware, upload.single('image'),
  RecipeController.image);

routes.get('/', RecipeController.index);
routes.get('/:id', RecipeController.get);
routes.put('/:id', authenticate, RecipeMiddleware, RecipeController.update);
routes.delete('/:id', authenticate, RecipeController.delete);
routes.post('/', authenticate, RecipeMiddleware, RecipeController.create);

module.exports = routes;
