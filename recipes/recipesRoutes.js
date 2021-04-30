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

// route.get('/recipes', recipesController.findUserController);
route.post('/recipes',
validateRecipesMiddleware,
validateTokenMiddleware,
recipesController.addRecipeController);
route.get('/recipes', recipesController.queryRecipesController);
route.get('/recipes/:id', recipesController.queryRecipeController);
route.post('/recipes/:id/image/', upload.array('file'), recipesController.recipeId);

module.exports = route;
