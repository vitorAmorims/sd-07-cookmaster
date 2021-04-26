const recipesModel = require('../models/recipesModel');

const CREATED = 201;
const BADREQUEST = 400;
const SUCCESS = 200;
const NOTFOUND = 404;

const registerRecipe = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await recipesModel.register(name, ingredients, preparation, _id);
    res.status(CREATED).send({
      recipe: newRecipe,
    });
    } catch (err) {
      console.error(err.message);
      res.status(BADREQUEST).json({ message: err.message });
    }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getAll();
    res.status(SUCCESS).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(BADREQUEST).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesModel.getById(id);
    if (!result) {
     return res.status(NOTFOUND).json({ message: 'recipe not found' });
    }
   return res.status(SUCCESS).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(BADREQUEST).json({ message: err.message });
  }
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
};