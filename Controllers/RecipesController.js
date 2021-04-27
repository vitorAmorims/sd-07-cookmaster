const {
  addRecipe,
  getRecipe,
  getRecipeForId,
} = require('../Services/RecipeService');
const error = require('../error/index');

const addRecipes = async (req, res) => {
  const resOK = 201;
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    if (!name || !ingredients || !preparation) throw error.invalidEntries;
    const newRecipe = await addRecipe(name, ingredients, preparation, id);
    res.status(resOK).json({ recipe: newRecipe });
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

const getAllRecipes = async (req, res) => {
  const resOK = 200;
  try {
    const searchRecipe = await getRecipe();
    res.status(resOK).json(searchRecipe);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

const getForId = async (req, res) => {
  const resOK = 200;
  const { id } = req.params;
  try {
    const recipeId = await getRecipeForId(id);
    res.status(resOK).json(recipeId);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

module.exports = {
  addRecipes,
  getAllRecipes,
  getForId,
};