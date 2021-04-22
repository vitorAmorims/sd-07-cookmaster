const status = require('../status');
const recipesModel = require('../models/recipesModel');

const createRecipes = async (request, response) => {
  try {
    const { _id } = request.user;
    const { name, ingredients, preparation } = request.body;
    const recipe = await recipesModel.createRecipes(name, ingredients, preparation, _id);
    response.status(status.CREATED).json(recipe);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  createRecipes,
};