const recipeModle = require('./recipeModels');
const recipeService = require('./recipeServices');

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const validadeRecipe = recipeService.validadeRecipe(name, ingredients, preparation);
    if (validadeRecipe) throw Error(validadeRecipe);

    const { _id } = req.user;
    const newRecipe = await recipeModle.createRecipe(name, ingredients, preparation, _id);
    res.status(CREATED).json({ recipe: newRecipe });
  } catch (error) {
    if (error.message === 'Invalid entries. Try again.') {
      return res.status(BADREQUEST).json({ message: error.message });
    }
  }
};

const getAllRecipes = async (_req, res) => {
    const allRecipes = await recipeModle.getAllRecipes();
    res.status(OK).json(allRecipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
