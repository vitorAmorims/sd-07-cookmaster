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

module.exports = {
  registerRecipes,
};
