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
    const { _id } = req.user;
    const userId = _id;
    const recipeToUpdate = await updateRecipeService(id, name, ingredients, preparation);
    console.log(recipeToUpdate);
    res.status(httpStatus.SUCCESS).json({ _id: id, name, ingredients, preparation, userId });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRecipeController,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};