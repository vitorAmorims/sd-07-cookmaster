const { add, getAll, getById } = require('../models/RecipesModel');
// const {  } = require('../services/recipesService');
const { verifyRequest } = require('../services/usersService');

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
// const UNAUTHORIZED = 401;
// const CONFLICT = 409;

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    await verifyRequest(name, ingredients, preparation);

    const { _id } = req.user;
    const recipe = await add(name, ingredients, preparation, _id);
    res.status(CREATED).json({ recipe });
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const getRecipes = async (_req, res) => {
  try {
    const recipes = await getAll();
    res.status(SUCCESS).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getById(id);

    res.status(SUCCESS).json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(NOT_FOUND).json({ message: err.message });
  }
};

module.exports = { addRecipe, getRecipes, getRecipeById };
