const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes'); 
const recipesService = require('../services/recipesService');

const createdStatus = 201;
const okStatus = 200;

const newRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    
    const recipeAdd = await recipesService.add(name, ingredients, preparation, _id);
    res.status(createdStatus).json({ recipe: { ...recipeAdd } });
});

const allRecipes = rescue(async (req, res) => {
  const recipe = await recipesService.getAll();
  res.status(StatusCodes.OK).json(recipe);
});

const getByID = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.getByID(id);
  res.status(okStatus).json(result);
});

const updateByID = rescue(async (req, res) => {
  const { id } = req.params;
  const { body, user } = req;

  const updatedRecipe = await recipesService.update(id, body, user);

  res.status(okStatus).json(updatedRecipe);
});

module.exports = {
  newRecipe,
  allRecipes,
  getByID,
  updateByID,
};
