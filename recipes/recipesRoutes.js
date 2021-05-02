const express = require('express');
const multer = require('multer');
const { 
  validateRecipesMiddleware,
  validateTokenMiddleware,
  validate,
} = require('../middleware/validatesMiddleware');
const recipesController = require('./recipesController');

const route = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
      callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
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
route.put(recipesId,
validateTokenMiddleware,
validate,
recipesController.updateRecipeController);
route.delete(recipesId, validateTokenMiddleware, recipesController.excludeRecipeController);
route.put('/recipes/:id/image/', 
validateTokenMiddleware, 
upload.single('image'), 
recipesController.recipeId);

module.exports = route;
