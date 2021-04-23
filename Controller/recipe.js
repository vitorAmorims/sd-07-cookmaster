const recipe = require('../Service/recipe');
const { 
  CREATED, 
  BAD_REQUEST, 
  OK, 
  INTERAL_SERVER_ERROR, 
  NOT_FOUND, 
  NO_CONTENT } = require('./statusCodes');

const create = async (req, res) => {
  try {
    const result = await recipe.create(req.body, req.user);
    res.status(CREATED).json({ recipe: result });
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    res.status(OK).json(recipes);
  } catch (error) {
    res.status(INTERAL_SERVER_ERROR).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await recipe.getById(id);
    res.status(OK).json(recipes);
  } catch (error) {
    res.status(NOT_FOUND).json(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipe.updateRecipe(req.body, req.user, id);
    res.status(OK).json(result);
  } catch (error) {
    res.status(BAD_REQUEST).json(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipe.deleteRecipe(id);
    res.status(NO_CONTENT).json(result);
  } catch (error) {
    res.status(INTERAL_SERVER_ERROR).json({ message: 'Algo deu errado.' });
  }
};

const insertImage = async (req, res) => {
  try {
    const result = await recipe
      .insertImage(req.params.id, `localhost:3000/${req.file.path}`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  create,
  getAllRecipes,
  getById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};