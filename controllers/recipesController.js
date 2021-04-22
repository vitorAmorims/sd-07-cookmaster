// const Joi = require('joi');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');
const rescue = require('express-rescue');
const recipesService = require('../service/recipesService');

const CREATED = 201;

const registerRecipes = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newRecipes = await recipesService.registerRecipes(
    name,
    ingredients,
    preparation,
    _id,
  );

  if (newRecipes.message) return next(newRecipes);

  res.status(CREATED).json(newRecipes);
});

const findByIdRecipes = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesService.findByIdRecipes(id);
  if (recipe.message) return next(recipe);
  res.status(200).json(recipe);
});

const getAllRecipes = rescue(async (req, res, _next) => {
  const allRecipes = await recipesService.getAllRecipes();
  res.status(200).json(allRecipes);
});

const updateRecipes = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updatedRecipes = await recipesService.updateRecipes(
    id,
    name,
    ingredients,
    preparation,
  );
  res.status(200).json(updatedRecipes);
});

module.exports = {
  registerRecipes,
  getAllRecipes,
  findByIdRecipes,
  updateRecipes,
};
