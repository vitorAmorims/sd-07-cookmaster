/** @format */
const { Router } = require('express');
const { body } = require('express-validator');

const { validToken, validRecipeMiddleware, multerMiddleware } = require('../Middlewares');

const {
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
  upImageController,
  imageUploadService,
} = require('../controllers');

const rota = '/recipes/:id';

const routerRecipe = Router();

routerRecipe.post(
  '/recipes',
  validToken,
  body('name').notEmpty(),
  body('ingredients').notEmpty(),
  body('preparation').notEmpty(),
  validRecipeMiddleware,
  createRecipe,
);

routerRecipe.get(
  '/recipes',
  recipesGet,
);

routerRecipe.get(
  rota,
  recipesGetId,
);

routerRecipe.put(
  rota,
  validToken,
  body('name').notEmpty(),
  body('ingredients').notEmpty(),
  body('preparation').notEmpty(),
  validRecipeMiddleware,
  recipesUp,
);

routerRecipe.delete(
  '/recipes/:id',
  validToken,
  validRecipeMiddleware,
  recipesDelete,
);

routerRecipe.put(
  '/recipes/:id/image',
  validToken,
  multerMiddleware,
  upImageController,
);

module.exports = { routerRecipe };
