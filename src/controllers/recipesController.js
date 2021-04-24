const { add, getAll, getById } = require('../models/recipesModel');
const {
  UNAUTHORIZED_401,
  CREATED_201, 
  OK_200, 
  NOT_FOUND_404 } = require('../util');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;

    const recipe = await add(name, ingredients, preparation, id);

    res.status(CREATED_201).json({ recipe });
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED_401).send({ message: 'Incorrect username or password' });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAll();

    res.status(OK_200).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED_401).send({ message: 'Incorrect username or password' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await getById(id);
    if (!recipe) {
      throw new Error();
    }
    res.status(OK_200).json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(NOT_FOUND_404).send({ message: 'recipe not found' });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
};
