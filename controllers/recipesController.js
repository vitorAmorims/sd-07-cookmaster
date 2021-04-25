const Recipes = require('../models/recipesModels');

const SUCCESS = 201;
const SUCCESS200 = 200;
const SYSTEM_FAIL = 500;
const FAIL = 404;

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
    res.status(SUCCESS200).json(results);
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Recipes.getRecipeById(id);
    res.status(SUCCESS200).json(results);
  } catch (err) {
    res.status(FAIL).json({ message: 'recipe not found' });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  try {
    const results = await Recipes.updateRecipe(id, name, ingredients, preparation);
    res.status(SUCCESS200).json(results);
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

// const uploadImage = async (req, res) => {
//   try {
//     // editar o results
//     res.status(SUCCESS200).json(results);
//   } catch (err) {
//     res.status(SYSTEM_FAIL).json({ message: err.message });
//   }
// };

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  // uploadImage,
};