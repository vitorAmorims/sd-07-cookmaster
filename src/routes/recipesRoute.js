const express = require('express');
const multer = require('multer');
const { recipeControllers } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },      
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipeIdRoute = '/recipes/:id';

route.get('/recipes', recipeControllers.getAllRecipes);
route.get(recipeIdRoute, recipeControllers.getRecipesById);
route.put(recipeIdRoute, tokenValidator, recipeControllers.editRecipe);
route.put(`${recipeIdRoute}/image/`,
  tokenValidator,
  upload.single('image'),
  recipeControllers.addImageRecipe);
route.delete(recipeIdRoute, tokenValidator, recipeControllers.deletRecipe);
route.post('/recipes', tokenValidator, recipeControllers.creatRecipe);

module.exports = route;