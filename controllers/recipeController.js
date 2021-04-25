const status = require('../status');
const { recipeService } = require('../services');

const addRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const { user } = req;
    const response = await recipeService.createRecipe(recipe, user);
    if (response.err) {
      return res.status(response.err_code).send({ message: response.err });
    }
    res.status(status.CREATED).json({ recipe: response });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes();
    res.status(status.OK).json(recipes);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
};