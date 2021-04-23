const RecipesModel = require('../models/RecipesModel');
const { CREATED, SUCCESS } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await RecipesModel.create({ name, ingredients, preparation });
  return res.status(CREATED).json(newRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await RecipesModel.getAll();
  return res.status(SUCCESS).json(recipes);
};

module.exports = {
  create,
  getAll,
};
