const RecipesModel = require('../models/RecipesModel');
const { CREATED } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await RecipesModel.create({ name, ingredients, preparation });
  return res.status(CREATED).json(newRecipe);
};

module.exports = {
  create,
};
