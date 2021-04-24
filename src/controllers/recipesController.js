const { add, getAll } = require('../models/recipesModel');
const {
  UNAUTHORIZED_401,
  CREATED_201, 
  OK_200 } = require('../util');

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

module.exports = {
  addRecipe,
  getAllRecipes,
};
