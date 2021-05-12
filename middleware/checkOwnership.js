const { getRecipeById } = require('../models/recipes');

const checkOwnership = async (err, request, _response, next) => {
  if (err.status !== 200) return next(err);
  const { _id: tokenId, role } = err;
  const { id } = request.params;

  if (role === 'admin') return next();

  const { userId: recipeOwnerId } = await getRecipeById(id);

  if (tokenId !== recipeOwnerId) {
    return next({
      status: 401,
      message: 'You are not the owner of this recipe',
    });
  }

  next();
};

module.exports = checkOwnership;
