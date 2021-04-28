const { createRecipeService,
  getAllRecipesService,
  getRecipesByIdService,
  updateRecipeService,
 } = require('../service/recipes');
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

const getAllRecipes = async (req, res) => {
  try {
    const recipesList = await getAllRecipesService();
    res.status(httpStatus.SUCCESS).json(recipesList);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'Não há receitas',
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipesByIdService(id);
    res.status(httpStatus.SUCCESS).json(recipe);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      message: error.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const recipeToUpdate = await updateRecipeService(id, name, ingredients, preparation);
    res.status(httpStatus.SUCCESS).json(recipeToUpdate);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'não funfou :(',
    });
  }
};

module.exports = {
  createRecipeController,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};