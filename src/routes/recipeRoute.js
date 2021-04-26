const express = require('express');

const path = require('path');

const { validationMiddleware, authMiddleware } = require('../middlewares');
const { recipeController } = require('../controller');

const router = express.Router();

router.use(express.json());

const BASE_URL = '/recipes';

router.post(BASE_URL,
            authMiddleware.validateToken,
            validationMiddleware.validateRecipe,
            recipeController.createRecipe);

router.get(BASE_URL, recipeController.getRecipes);

router.get(`${BASE_URL}/:id`, validationMiddleware.isRecipeExists, recipeController.getRecipeById);

router.put(`${BASE_URL}/:id`, authMiddleware.validateTokenUpdating, recipeController.updateRecipe);

router.delete(`${BASE_URL}/:id`,
              authMiddleware.validateTokenUpdating,
              recipeController.deleteRecipe);

router.put(`${BASE_URL}/:id/image`,
           authMiddleware.validateTokenUpdating,
           recipeController.uploadPhoto);
  
router.get('/images',
           express.static(path.join(__dirname, '../', 'uploads/')),
           recipeController.getPhoto);

module.exports = router;