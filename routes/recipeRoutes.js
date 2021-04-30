/** @format */
const express = require('express');

const { Router } = require('express');
const { body } = require('express-validator');
const path = require('path');
const { uploadImage } = require('../services');

const { validToken, validRecipeMiddleware } = require('../Middlewares');

const {
  createRecipe,
  recipesGet,
  recipesGetId,
  recipesUp,
  recipesDelete,
  UpImage,
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
routerRecipe.use('images', express.static(path.join(__dirname, '../uploads')));

routerRecipe.put(
  '/recipes/:id/image',
  validToken,
  uploadImage,
  UpImage,
);

module.exports = { routerRecipe };
