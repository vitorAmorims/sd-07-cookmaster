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

module.exports = {
  createRecipe,
};