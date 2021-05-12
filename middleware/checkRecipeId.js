const { getRecipeById } = require('../models/recipes');

const checkRecipeId = async (request, _response, next) => {
  const { id } = request.params;

  if (id.length !== 12 && id.length !== 24) {
    return next({
      status: 404,
      message: 'recipe not found',
    });
  }

  const result = await getRecipeById(id);
  if (result === null) {
    return next({
      status: 404,
      message: 'recipe not found',
    });
  }

  next();
};

module.exports = checkRecipeId;
