const express = require('express');
const multer = require('multer');
const recipeController = require('../controllers/RecipesController');
const middlewareRecipe = require('../middlewares/RecipesMiddlewares');
const auth = require('../middlewares/AuthMiddleware');

const commomPath = '/recipes/:id';
const recipes = express.Router();

recipes.use(express.static(`${__dirname}/images`));
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, `${__dirname}/../images`);
  },
  filename: (req, file, callback) => {
      const { id } = req.params;       
      callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

recipes.post('/recipes', [auth.allUser, middlewareRecipe.existAllFields], recipeController.add);
recipes.get(commomPath, recipeController.getRecipe);
recipes.get('/recipes', recipeController.listAll);
recipes.put(commomPath, [auth.allUser], recipeController.update);
recipes.delete(commomPath, [auth.allUser], recipeController.remove);
recipes.put(`${commomPath}/image`, [
  auth.allUser,   
  upload.single('image')], recipeController.addImage);
recipes.get('/images/:id', recipeController.getImage);

module.exports = recipes;
