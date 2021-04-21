const recipesServices = require('../services/recipesServices');

const createRecipe = async (req, res) => {
  const recipe = req.body;

  try {
    const response = await recipesServices.createRecipe(recipe);

    res.status(201).json(response);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const findAllRecipes = async (_req, res) => {
  try {
    const response = await recipesServices.findAllRecipes();

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ message: err.message }); 
  }
};

module.exports = {
  createRecipe,
  findAllRecipes,
};