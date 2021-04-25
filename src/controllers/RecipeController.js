const recipeService = require('../services/RecipeService');

module.exports = {
  create: async (request, response) => {
    try {
      const { body, headers } = request;
      const { data, httpStatus } = await recipeService.create(body, headers);
      return response.status(httpStatus).json({ recipe: data });
    } catch ({ message, httpStatus }) {
      return response.status(httpStatus).json({ message });
    }
  },
};
