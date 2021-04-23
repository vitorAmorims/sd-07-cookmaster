const recipesService = require('../services/recipesService');
const { recipesValidation } = require('../services/recipesValidation');

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const reqRecipes = req.body;
    recipesValidation(reqRecipes);
    const newRecipe = await recipesService.createRecipe(name, ingredients, preparation);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
};
