const recipesServices = require('../services/recipesServices');
const HttpResponses = require('../httpResponses.json');

const createRecipe = async (req, res) => {
  const recipe = req.body;

  try {
    const response = await recipesServices.createRecipe(recipe);

    res.status(HttpResponses.codes.CREATED).json(response);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const findAllRecipes = async (_req, res) => {
  try {
    const response = await recipesServices.findAllRecipes();

    res.status(HttpResponses.codes.OK).json(response);
  } catch (err) {
    res.status(HttpResponses.codes.NOT_FOUND).json({ message: err.message }); 
  }
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await recipesServices.findById(id);

    res.status(HttpResponses.codes.OK).json(response);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findById,
};