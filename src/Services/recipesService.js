const { ObjectId } = require('mongodb');
const {
  addImage,
  createRecipe,
  deleteRecipe,
  editRecipe,
  findAllRecipes,
  findOneRecipe,
} = require('../Models/recipesModel');

const BADREQUEST = 400;
const NOTFOUND = 404;

// with return
const createNewRecipe = async (data) => {
  const recipeInserted = await createRecipe(data);
  return {
    recipe: recipeInserted,
  };
};

// short
const getAllRecipes = async () => findAllRecipes();
// const getAllRecipes = async () => {
//   const recipes = await findAllRecipes();
//   const recipesList = {
//     recipes,
//   };
//   return recipesList;
// };

const getRecipeById = async (id) => {
  const recipeById = await findOneRecipe(id);
  return recipeById;
};

const putRecipe = async (id, name, ingr, prep) => {
  await editRecipe(id, name, ingr, prep);
  return {
    id,
    name,
    ingr,
    prep,
  };
};

const excludeRecipe = async (id) => {
  await deleteRecipe(id);
  return true;
};

// short
const fetchImage = async (id, image) => addImage(id, image);

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BADREQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NOTFOUND).json({
    message: 'recipe not found',
    });
  }
  next();
};

module.exports = {
  createNewRecipe,
  fetchImage,
  excludeRecipe,
  getAllRecipes,
  getRecipeById,
  putRecipe,
  validateRecipe,
  validateId,
};
