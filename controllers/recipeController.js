const recipeService = require('../services/recipeService');

const HTTP201 = 201;
const HTTP500 = 500;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const result = await recipeService.createRecipe(name, ingredients, preparation, userId);        
    res.status(HTTP201).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
};