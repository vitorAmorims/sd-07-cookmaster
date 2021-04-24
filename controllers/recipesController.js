const Recipes = require('../models/recipesModels');

const SUCCESS = 201;
const SUCCESS200 = 200;
const SYSTEM_FAIL = 500;
// const FAIL = 404;

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  try {
    const results = await Recipes.addRecipe(userId, name, ingredients, preparation);
    res.status(SUCCESS).json({ recipe: results.ops[0] });
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const results = await Recipes.getRecipes();
    // console.log(results);
    res.status(SUCCESS200).json(results);
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

module.exports = {
  addRecipe,
  getRecipes,
};