const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const OK = 200;
const CREATE = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
// const UNPROCESS = 422;
 const ERROR = 500;
// const objError = {
//   err: {
//     code: 'invalid_data',
//     message: ''
//   }
// };

const getAll = async (_req, res) => {
  try {
    const results = await recipesModel.getAll();
    res.status(OK).json(results);
  } catch (error) {
    console.error(error);
    res.status(ERROR).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await recipesService.getById(id);

    res.status(OK).json(results);
   } catch (error) {
    const { message } = error;
    if (message.includes('found')) {
      return es.status(NOT_FOUND).json({ message: error.message });
    }
    res.status(ERROR).json({ message: error.message });
  }
};

const add = async (req, res) => {
  try {
    const result = await recipesService.add(req);

    res.status(CREATE).json(result);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('Invalid')) {
      return res.status(BAD_REQUEST).json({ message: error.message });
    }
    if (message.includes('jwt')) {
      return res.status(UNAUTHORIZED).json({ message: error.message });
    }
    res.status(ERROR).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const result = await recipesService.update(req);
    console.log(result);
    res.status(OK).json(result);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('jwt') || message.includes('token')) {
      res.status(UNAUTHORIZED).json({ message: error.message });
    }
    res.status(ERROR).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await recipesService.deleteRecipe(req);

    res.status(NO_CONTENT).json();
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('jwt') || message.includes('token')) {
      return res.status(UNAUTHORIZED).json({ message: error.message });
    }
    res.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  deleteRecipe,
};
