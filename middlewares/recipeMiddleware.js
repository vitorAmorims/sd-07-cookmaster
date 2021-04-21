const recipesModel = require('../model/recipesModel');

const notFound = 404;

const recipeMiddleware = async (req, res, next) => {
  const recipeIspresent = await recipesModel.getRecipe(req.params.id);
  if (!recipeIspresent) {
    return res.status(notFound).send({
      message: 'recipe not found',
    });
  }

  next();
};

module.exports = recipeMiddleware;
