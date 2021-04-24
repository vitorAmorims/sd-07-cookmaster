const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/RecipesModel');
const { CREATED, SUCCESS, NOT_FOUND, NO_CONTENT } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user: { _id: id } } = req;

  const newRecipe = await RecipesModel.create({
    name,
    ingredients,
    preparation,
    userId: ObjectId(id),
  });
  return res.status(CREATED).json(newRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await RecipesModel.getAll();
  return res.status(SUCCESS).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipesModel
    .getById(id);

  if (!recipe) {
    const err = new Error();
    err.code = 'not_found';
    err.message = 'recipe not found';
    return res.status(NOT_FOUND).json({ err });
  }
  return res.status(SUCCESS).json(recipe);
};

const update = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const updatedRecipe = await RecipesModel.update(id, name, ingredients, preparation);
  res.status(SUCCESS).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const product = await RecipesModel.deleteRecipe(id);
  res.status(NO_CONTENT).json(product);
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/images/${id}.jpeg`;

  const updatedRecipe = await RecipesModel.updateImage(id, image);
  res.status(SUCCESS).json(updatedRecipe);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
  uploadImage,
};
