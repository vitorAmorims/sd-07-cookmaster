const recipeModels = require('../models/recipeModels');
const recipeServices = require('../services/recipeServices');

const SUCCESS = 200;
const CREATE = 201;
const DELETE = 204;
// const USERERR = 404;
const SERVERERR = 500;

const Model = recipeModels;
const Service = recipeServices;

const getAllRecipes = async (_req, res) => {
  try {
    const results = await Model.getAll();
    
    res.status(SUCCESS).send(results);
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await Service.getById(id);
    console.log(message);
    if (!message.response) {
      const result = await Model.getById(id);
      return res.status(SUCCESS).send(result);
    }
    return res.status(message.status).send(message.response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, userId, ingredients, preparation } = req.body;
    const { status, response } = await Service.create({ name, ingredients, preparation });
    if (!response) {
      const result = await Model.create({ name, userId, ingredients, preparation });
      return res.status(CREATE).send(result);
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { userId, name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { status, response } = await Service
      .update({ id, userId, name, ingredients, preparation });
    if (!response) {
      const result = await Model.update({ id, userId, name, ingredients, preparation });
      console.log(result);
      return res.status(SUCCESS).json(result);
    }    
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = await Service.exclude(id);
    if (!response) {
      await Model.exclude(id);
      return res.status(DELETE).end();
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
