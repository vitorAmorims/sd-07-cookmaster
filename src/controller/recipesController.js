const status = require('../status');
const recipesModel = require('../models/recipesModel');

const MSG_NOT_FOUND = "recipe not found";

const createRecipes = async (request, response) => {
  try {
    const { _id } = request.user;
    const { name, ingredients, preparation } = request.body;
    const recipe = await recipesModel.createRecipes(name, ingredients, preparation, _id);
    response.status(status.CREATED).json({recipe});
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getAll = async (_request, response) => {
  try {
    const result = await recipesModel.getAll();
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await recipesModel.getById(id);

    if (!result) {
      return response.status(status.NOT_FOUND)
        .json({message: MSG_NOT_FOUND});
    }
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};


const update = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, ingredients, preparation } = request.body;
    const result = await productModel.update(id, name, ingredients, preparation);

    if (!result) {
      return response.status(status.NOT_FOUND)
        .json({message: MSG_NOT_FOUND});
    }
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  createRecipes,
  getAll,
  getById,
};