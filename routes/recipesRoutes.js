const express = require('express');

const path = require('path');

const multer = require('../config/multer');

const PATH = 'recipes';

const {
  error,
  validateToken,
  recipeFieldsValidatation,
  addImageValidation,
} = require('../middlewares');

const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteProduct,
  addImage,
} = require('../controllers/recipesController');

const router = express.Router();
router.use(express.json());
router.use('/images', express.static(path.join(__dirname, '../uploads')));

router.get(`/${PATH}`, getAllRecipes);

router.get(`/${PATH}/:id`, getRecipeById);

router.post(
  `/${PATH}`,
  validateToken,
  recipeFieldsValidatation,
  addRecipe,
);

router.put(
  '/recipes/:id',
  validateToken,
  recipeFieldsValidatation,
  updateRecipe,
);

router.delete(
  '/recipes/:id',
  validateToken,
  deleteProduct,
);

router.put(
  '/recipes/:id/image',
  [
    validateToken,
    addImageValidation,
    multer.upload.single('image'),
  ],
  addImage,
);

router.use(error);

module.exports = router;
