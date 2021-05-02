const express = require('express');
const multer = require('multer');
const { 
  validateRecipesMiddleware,
  validateTokenMiddleware,
} = require('../middleware/validatesMiddleware');
const recipesController = require('./recipesController');

const route = express.Router();

route.use(express.static(`${__dirname}uploads/`));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
      callback(null, 'uploads/');
  },
  filename: (_req, file, callback) => {
      callback(null, `${file.recipesController.recipeId}.jpeg`);
  },
});

const upload = multer({ storage });

const recipesId = '/recipes/:id';
// route.get('/recipes', recipesController.findUserController);
route.get('/recipes', recipesController.queryRecipesController);
route.post('/recipes',
validateRecipesMiddleware,
validateTokenMiddleware,
recipesController.addRecipeController);
route.get(recipesId, recipesController.queryRecipeController);
route.post(recipesId,
validateTokenMiddleware,
recipesController.updateRecipeController);
route.delete(recipesId, validateTokenMiddleware, recipesController.excludeRecipeController);
route.post('/recipes/:id/image/', upload.array('file'), recipesController.recipeId);
// route.get(`${recipesId}.jpeg`,recipesController.queryImageController);

module.exports = route;
