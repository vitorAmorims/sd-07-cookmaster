const express = require('express');
const {
  postRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  postRecipeImage,
} = require('../controllers/recipeController');
const isLogged = require('../middlewares/isLogged');
const editAuthorization = require('../middlewares/editAuthorization');
const imageMiddleware = require('../middlewares/imageMiddleware');

const router = express.Router();

const routeName = '/recipes';
const routeNameId = '/recipes/:id';

router.post(routeName, isLogged, postRecipe);
router.put(routeNameId, isLogged, editAuthorization, editRecipe);
router.put('/recipes/:id/image', [isLogged, editAuthorization, imageMiddleware], postRecipeImage);
router.delete(routeNameId, isLogged, editAuthorization, deleteRecipe);
router.get(routeName, getRecipes);
router.get(routeNameId, getRecipe);

module.exports = router;