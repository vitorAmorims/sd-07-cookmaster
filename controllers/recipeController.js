const recipeService = require('../services/recipeService');

const HTTP200 = 200;
const HTTP201 = 201;
const HTTP500 = 500;

const createRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const { name, ingredients, preparation } = req.body;    
    const result = await recipeService.createRecipe(name, ingredients, preparation, userId);        
    res.status(HTTP201).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const allRecipes = async (req, res) => {
  try {
    const result = await recipeService.getAllRecipe();        
    res.status(HTTP200).json(result);    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
  allRecipes,
};