const recipeModle = require('./recipeModels');
const recipeService = require('./recipeServices');

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const NOTFOUND = 404;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const validadeRecipe = recipeService.validadeRecipe(name, ingredients, preparation);
    if (validadeRecipe) throw Error(validadeRecipe);

    const { _id } = req.user;
    const newRecipe = await recipeModle.createRecipe(name, ingredients, preparation, _id);
    res.status(CREATED).json({ recipe: newRecipe });
  } catch (error) {
    res.status(BADREQUEST).json({ message: error.message });
  }
};

const getAllRecipes = async (_req, res) => {
    const allRecipes = await recipeModle.getAllRecipes();
    res.status(OK).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const validadeId = recipeService.validadeId(id);
    if (validadeId) throw Error(validadeId);

    const recipe = await recipeModle.getRecipeById(id);
    res.status(OK).json(recipe);
  } catch (error) {
    res.status(NOTFOUND).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updated = await recipeModle.updateRecipe(id, name, ingredients, preparation);
  console.log(updated);
  res.status(OK).json(updated);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
