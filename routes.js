const { Router } = require('express');
const { imageUpload } = require('./middlewares/multer');

const auth = require('./middlewares/auth');
const User = require('./controllers/User');
const Recipe = require('./controllers/Recipes');

const routes = Router();

routes.route('/').get((request, response) => response.send());

routes.route('/login').post(User.login);

routes.route('/recipes').get(Recipe.getRecipes).post(auth, Recipe.createRecipe);

routes
  .route('/recipes/:id')
  .get(Recipe.getRecipeById)
  .put(auth, Recipe.editRecipe)
  .delete(auth, Recipe.deleteRecipe);

routes
  .route('/recipes/:id/image')
  .put(auth, imageUpload.single('image'), Recipe.addImage);

routes.route('/users').post(User.createUser);

routes.route('/users/admin').post(auth, User.createAdmin);

module.exports = routes;
