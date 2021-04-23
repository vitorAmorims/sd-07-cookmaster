const recipesService = require('../services/recipesService');

const STATUS_BAD_REQUEST = 400;
const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await recipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ recipe: result });
  }
};

const getAllRecipes = async (req, res) => {
  const result = await recipesService.getAllRecipes();
  res.status(STATUS_OK).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const result = await recipesService.getRecipeById(id);

  if (typeof result === 'string') {
    res.status(STATUS_NOT_FOUND).json({ message: result });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await recipesService.updateRecipe(
    id,
    name,
    ingredients,
    preparation,
  );

  if (typeof result === 'string') res.send({ message: result });

  res.status(STATUS_OK).json({ id, name, ingredients, preparation, userId });
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe };
