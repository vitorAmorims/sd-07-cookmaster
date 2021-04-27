const { createRecipeService } = require('../service/recipes');
const httpStatus = require('./httpStatus');

const createRecipeController = async (req, res) => {
  try {
  const recipe = req.body;
  const payload = req.user;
  const createRecipe = await createRecipeService(recipe, payload);
  res.status(httpStatus.CREATED).json({ recipe: createRecipe });
  } catch (error) {
   if (error.message === 'jwt malformed') {
     return res.status(httpStatus.UNAUTHORIZED).json({
       message: error.message,
     });
   }
   res.status(httpStatus.BAD_REQUEST).json({
    message: error.message,
  });
  }
};

module.exports = {
  createRecipeController,
};