const serviceRecipe = require('../services/serviceRecipe');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await serviceRecipe.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  if (result === 'Invalid entries. Try again.') {
    res.status(BAD_REQUEST).json({ message: result });
  } else {
    res.status(CREATED).json({ recipe: result });
  }
};

const getAllRecipes = async (req, res) => {
  const result = await serviceRecipe.getAllRecipes();
  res.status(OK).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const result = await serviceRecipe.getRecipeById(id);

  if (typeof result === 'string') {
    res.status(NOT_FOUND).json({ message: result });
  } else {
    res.status(OK).json(result);
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await serviceRecipe.updateRecipe(
    id,
    name,
    ingredients,
    preparation,
  );

  if (typeof result === 'string') res.send({ message: result });

  res.status(OK).json({ id, name, ingredients, preparation, userId });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const result = await serviceRecipe.deleteRecipe(id);

  if (typeof result === 'string') res.send({ message: result });

  res.status(NO_CONTENT).json();
};

const pictureUpload = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const path = `localhost:3000/images/${filename}`;

  const result = await serviceRecipe.pictureUpload(id, path);
  res.status(OK).json(result);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  pictureUpload,
};
