/** @format */
const express = require('express');

const { Router } = require('express');
const { body } = require('express-validator');
const path = require('path');
const { uploadImage } = require('../services');

const { validToken, validRecipeMiddlewareare } = require('../Middlewares');

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
  body('name').notEmpty(),
  body('ingredients').notEmpty(),
  body('preparation').notEmpty(),
  validRecipeMiddlewareare,
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
  validRecipeMiddlewareare,
  recipesUp,
);

routerRecipe.delete(
  '/recipes/:id',
  validToken,
  validRecipeMiddlewareare,
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
