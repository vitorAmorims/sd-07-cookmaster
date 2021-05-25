const RecipesService = require('../services/RecipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const { code, message, recipe } = await RecipesService
    .create(userId, name, ingredients, preparation);

  if (message) return res.status(code).send({ message });

  res.status(201).send({ recipe });
};

const getAll = async (_req, res) => {
  const recipes = await RecipesService.getAll();
  res.status(200).send(recipes);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { code, message, recipe } = await RecipesService.findById(id);
  if (message) res.status(code).send({ message });

  res.status(200).send(recipe);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const { code, message, recipe } = await RecipesService
    .updateById(id, name, ingredients, preparation);

  if (message) return res.status(code).send({ message });

  res.status(200).send(recipe);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  console.log(req.user);
  const { _id: userId, role } = req.user;

  const { code, message } = await RecipesService
    .deleteById(id, userId, role);

  if (message) return res.status(code).send({ message });

  res.status(204).send();
};

// const showImages = (req, res) => {

// };

// const updateImageById = (req, res) => {

// };

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
  // showImages,
  // updateImageById,
};
