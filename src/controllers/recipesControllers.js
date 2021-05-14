const { recipesService } = require('../service');
const { httpStatusCode } = require('../../constants');

const creatRecipe = async (req, res, next) => {
  const recipe = req.body;
  recipe.userId = req.user;
  try {
    const creadtedRecipe = await recipesService.creatRecipe(recipe);
    return res.status(httpStatusCode.CREATED).json({ recipe: creadtedRecipe });
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.BAD_REQUEST,
    });
  }
};

module.exports = {
  creatRecipe,
};
