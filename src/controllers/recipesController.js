const { addRecipe } = require('../models/recipesModel');
const {
  UNAUTHORIZED_401,
  CREATED_201 } = require('../util');

const recipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;

    const recipe = await addRecipe(name, ingredients, preparation, id);

    res.status(CREATED_201).json({ recipe });
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED_401).send({ message: 'Incorrect username or password' });
  }
};

module.exports = {
  recipes,
};
