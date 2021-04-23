const express = require('express');

const {
  checkRecipeBody,
  checkTokenToCreateRecipe,
  checkTokenToUpdade,
  checkTokenToDelete,
} = require('../middleware/recipesMiddleware');

const recipesController = require('../controller/recipesController');

const router = express.Router();
const recipes = '/recipes';

router.post(`${recipes}`,
  checkTokenToCreateRecipe,
  checkRecipeBody,
  recipesController.createRecipes);

router.get(`${recipes}`, recipesController.getAll);
router.get(`${recipes}/:id`, recipesController.getById);
router.put(`${recipes}/:id`, checkTokenToUpdade, checkRecipeBody, recipesController.update);
router.delete(`${recipes}/:id`, checkTokenToDelete, recipesController.excludeById);
module.exports = router;