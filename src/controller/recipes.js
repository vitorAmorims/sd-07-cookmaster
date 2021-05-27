const JWT = require('jwt-decode');
const {
  StatusCodes: {
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK,
    NOT_FOUND } } = require('http-status-codes');
const recipesService = require('../service/recipes');
const userServices = require('../service/users');

const register = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const formated = req.headers.authorization.replace(/['"]+/g, '');
    const payload = JWT(formated);
    const { _id } = await userServices.findByEmail(payload.email);
    const response = await recipesService.register({
      name, ingredients, preparation, userId: _id });
    return res.status(CREATED).send({ recipe: response });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const recipes = await recipesService.getAll();
    return res.status(OK).send(recipes);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await recipesService.getRecipe(id);
    if (recipes === null || !recipes) {
      return res.status(NOT_FOUND).send({
        message: 'recipe not found',
      });
    }
    console.log('idcontroler', recipes);
    return res.status(OK).send(recipes);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  getRecipe,
  register,
  getAll,
};