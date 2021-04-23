const RecipesModel = require('../models/RecipesModel');
const { CREATED, SUCCESS, NOT_FOUND } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await RecipesModel.create({ name, ingredients, preparation });
  return res.status(CREATED).json(newRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await RecipesModel.getAll();
  return res.status(SUCCESS).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipesModel
    .getById(id);

  if (!recipe) {
    const err = new Error();
    err.code = 'not_found';
    err.message = 'recipe not found';
    return res.status(NOT_FOUND).json({ err });
  }
  return res.status(SUCCESS).json(recipe);
};

module.exports = {
  create,
  getAll,
  getById,
};
