const recipeModle = require('./recipeModels');
const recipeService = require('./recipeServices');

const OK = 200;
const CREATED = 201;
const NOCONTENT = 204;
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
  
  res.status(OK).json(updated);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await recipeModle.deleteRecipe(id);
  res.status(NOCONTENT).end();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const params = { id, name, ingredients, preparation };
  const added = await recipeModle.addImage(params);

  res.status(OK).json(added);
};

// const getImage = async (req, res) => {
//   const { id } = req.params;
//   const image = await recipeModle.getImage(id);
//   // console.log('controller', image);
//   res.status(OK).json(image);
// };

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImage,
  // getImage,
};
