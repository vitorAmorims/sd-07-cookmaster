const { getUserByEmail } = require('../Services/loginService');
const {
  createNewRecipe,
  fetchImage,
  excludeRecipe,
  getAllRecipes,
  getRecipeById,
  putRecipe,
} = require('../Services/recipesService');

const OK = 200;
const CREATED = 201;
const NOCONTENT = 204;
const NOTFOUND = 404;

const createRecipe = async (req, res) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await createNewRecipe(recipe);
  return res.status(CREATED).json({ recipe });
};

const getAll = async (req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(OK).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(NOTFOUND).json({
      message: 'recipe not found',
    });
  }
  return res.status(OK).json(recipe);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const oldRecipe = await putRecipe(id, name, ingredients, preparation);
  const editedRecipe = { ...oldRecipe, name, ingredients, preparation };
  return res.status(OK).json(editedRecipe);
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  await excludeRecipe(id);
  return res.status(NOCONTENT).json();
};

const updateImg = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const imagePath = `localhost:3000/images/${filename}`;

  await fetchImage(id, imagePath);
  const result = await getRecipeById(id);

  return res.status(OK).json(result);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateById,
  excludeById,
  updateImg,
};
