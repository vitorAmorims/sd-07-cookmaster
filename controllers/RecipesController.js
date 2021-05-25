const RecipesService = require('../services/RecipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const { code, message, recipe } = await RecipesService
    .create(userId, name, ingredients, preparation);

  if (message) return res.status(code).send({ message });

  res.status(201).send({ recipe });
};

// const getAll = (req, res) => {

// };

// const getById = (req, res) => {

// };

// const updateById = (req, res) => {

// };

// const deleteById = (req, res) => {

// };

// const showImages = (req, res) => {

// };

// const updateImageById = (req, res) => {

// };

module.exports = {
  create,
  // getAll,
  // getById,
  // updateById,
  // deleteById,
  // showImages,
  // updateImageById,
};
