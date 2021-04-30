const recipeModels = require('../models/recipeModels');
const recipeServices = require('../services/recipeServices');

const SUCCESS = 200;
const CREATE = 201;
const DELETE = 204;
const USERERR = 404;
const SERVERERR = 500;

const Model = recipeModels;
const Service = recipeServices;

const getAllRecipes = async (_req, res) => {
  try {
    const results = await Model.getAll();
    
    res.status(SUCCESS).send({ products: results });
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) =>  {
  try {
    const { id } = req.params;
    const {status, response } = await Service.getById(id);
    if (!response) {
      const result = await Model.getById(id);
      return res.status(SUCCESS).send(result);
    }
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
  }
};

const createRecipe = async (req, res) =>  {
  try {
    const {name, ingredients, preparation} = req.body;
    const {status, response} = await Service.create({ name, ingredients, preparation });
    if (!response) {
      const result = await Model.create({ name, ingredients, preparation });
      return res.status(CREATE).send(result);
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const updateRecipe = async (req, res) =>  {
  try {
    const {name, ingredients, preparation} = req.body;
    const { id } = req.params;
    const {status, response} = await Service.update({ id, name, ingredients, preparation });
    if (!response) {
      const result = await Model.update({ id, name, ingredients, preparation });
      console.log(result);
      return res.status(SUCCESS).json({id, name, ingredients, preparation });
    }    
    return res.status(status).json(response);

  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});    
  }
};

const deleteRecipe = async (req, res) =>  {
  try {
    const { id } = req.params;
    const {status, response} = await Service.exclude(id);
    if (!response) {
      await Model.exclude(id);
      return res.status(SUCCESS).end();
    }
    return res.status(status).json(response);
    
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
    
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
