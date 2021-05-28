const recipesService = require('../services/recipesService');

const OK = 200;
const CREATE = 201;
const ERROR = 400;
const CONFLICT = 409;

const recipesCreate = async (request, response) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const token = request.headers.authorization;
    const recipe = await recipesService.createRecipes(
      name, ingredients, preparation, token,
    );
    
    return response.status(CREATE).json({ recipe });
  } catch (error) {
      const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    response.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (request, response) => {
  try {
    const recipesAll = await recipesService.getAll();
    return response.status(OK).json(recipesAll);
  } catch (error) {
    response.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
    recipesCreate,
    getAll,
};
