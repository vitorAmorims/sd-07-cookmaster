const express = require('express');
const RecipesController = require('../../controllers/RecipeController');
const validateJWT = require('../../auth/ValidateJWT');
const upload = require('../../config/multer');

const router = express.Router();

const recipeByID = '/recipes/:id';

router.post('/recipes', validateJWT, RecipesController.createRecipe);
router.get('/recipes', RecipesController.getAllRecipes);
router.get(recipeByID, RecipesController.getIdRecipes);
router.put(recipeByID, validateJWT, RecipesController.editRecipe);
router.delete(recipeByID, validateJWT, RecipesController.deleteRecipe);
router.put(
  '/recipes/:id/image',
  validateJWT,
  upload.single('image'),
  RecipesController.addImage,
);
router.get('/images/:file', RecipesController.getImageFile);

module.exports = router;