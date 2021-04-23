const express = require('express');
const path = require('path');
const recipeControllers = require('./recipeControllers');
const { validadeToken } = require('./recipeMiddlewares');
const { upload } = require('./recipeMulter');

const router = express.Router();

const RECIPESIDROUTE = '/recipes/:id';

router.post('/recipes', validadeToken, recipeControllers.createRecipe); // req. 3

router.get('/recipes', recipeControllers.getAllRecipes); // req. 4
router.get(RECIPESIDROUTE, recipeControllers.getRecipeById); // req. 5

router.put(RECIPESIDROUTE, validadeToken, recipeControllers.updateRecipe); // req. 7
router.use(express.static(path.join(__dirname, 'uploads')));
router.put('/recipes/:id/image/',
  [validadeToken, upload.single('image')], recipeControllers.addImage); // req. 9

router.delete(RECIPESIDROUTE, validadeToken, recipeControllers.deleteRecipe); // req. 8

module.exports = router;
