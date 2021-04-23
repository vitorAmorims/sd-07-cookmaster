const express = require('express');
const recipe = require('../Controller/recipe');
const validateToken = require('../middlewares/validateToken');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();
router.use(express.static(`${__dirname}/images`));

router.route('/recipes')
  .post(validateToken, recipe.create)
  .get(recipe.getAllRecipes);

router.route('/recipes/:id')
  .get(recipe.getById)
  .put(validateToken, recipe.updateRecipe)
  .delete(validateToken, recipe.deleteRecipe);

router.put('/recipes/:id/image/', 
  [validateToken, uploadMiddleware], 
  recipe.insertImage);

module.exports = router;