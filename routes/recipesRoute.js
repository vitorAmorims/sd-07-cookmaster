const { Router } = require('express');
const { recipesController } = require('../controllers');
const middlewares = require('../middlewares');
const multer = require('../config/multer');

const recipesRoute = Router();
const routeName = '/recipes';
const id = '/:id';

recipesRoute.post(
  routeName,
  middlewares.authMiddleware,
  middlewares.recipeMiddleware.dataRecipeInsertCheck,
  recipesController.createRecipe,
);

recipesRoute.get(
  `${routeName}${id}`,
  middlewares.recipeMiddleware.idExistCheck,
  recipesController.getRecipeById,
);

recipesRoute.get(
  routeName,
  recipesController.getRecipes,
);

recipesRoute.put(
  `${routeName}${id}`,
  middlewares.authMiddleware,
  middlewares.recipeMiddleware.dataUpdateRecipeCheck,
  recipesController.updateRecipeById,
);

recipesRoute.delete(
  `${routeName}${id}`,
  middlewares.authMiddleware,
  middlewares.recipeMiddleware.idExistCheck,
  recipesController.deleteRecipeById,
);

recipesRoute.put(
  `${routeName}${id}/image`,
  middlewares.authMiddleware,
  multer.upload.single('image'),
  recipesController.uploadImageInDb,
);

recipesRoute.get('/images/:id', recipesController.getImageRecipe);

module.exports = recipesRoute;
