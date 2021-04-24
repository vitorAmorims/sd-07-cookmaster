const { recipesService } = require('../services');
const { STATUS_CODE } = require('../helpers');

const recipesRegistration = async (request, response) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const auth = request.headers.authorization;
    const result = await recipesService.recipesRegistration(auth, name, ingredients, preparation);
    response.status(STATUS_CODE.CREATED).json({ recipe: result });
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  recipesRegistration,
};