const Recipes = require('../models/recipesModels');

const SUCCESS = 201;
const SYSTEM_FAIL = 500;
const FAIL = 404;

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  try {
    const results = await Recipes.addRecipe(name, ingredients, preparation);
    res.status(SUCCESS).json(results.ops[0]);
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

module.exports = {
  addRecipe,
};