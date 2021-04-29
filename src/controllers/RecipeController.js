const recipeService = require('../services/RecipeService');

module.exports = {
  async create(request, response) {
    const { body, headers } = request;
    const { status, data, message, httpStatus } = await recipeService.create(body, headers);
    if (status === 'failure') {
      return response.status(httpStatus).json({ message });
    }
    return response.status(httpStatus).json({ recipe: data });
  },
  async getAll(request, response) {
    const { status, data, message, httpStatus } = await recipeService.getAll();
    if (status === 'failure') {
      return response.status(httpStatus).json({ message });
    }
    return response.status(httpStatus).json(data);
  },
  async getById(request, response) {
    const { id } = request.params;
    const { status, data, message, httpStatus } = await recipeService.getById(id);
    if (status === 'failure') {
      return response.status(httpStatus).json({ message });
    }
    return response.status(httpStatus).json(data);
  },
  async update(request, response) {
    const { id } = request.params;
    const { body, headers } = request;
    const { status, data, message, httpStatus } = await recipeService.update(body, headers, id);
    if (status === 'failure') {
      return response.status(httpStatus).json({ message });
    }
    return response.status(httpStatus).json(data);
  },
};
