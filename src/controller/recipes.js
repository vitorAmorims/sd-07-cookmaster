const JWT = require('jwt-decode');
const {
  StatusCodes: {
    INTERNAL_SERVER_ERROR,
    CREATED } } = require('http-status-codes');
const recipesService = require('../service/recipes');
const userServices = require('../service/users');

const register = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const formated = req.headers.authorization.replace(/['"]+/g, '');
    const payload = JWT(formated);
    console.log('payload', payload);
    const { _id } = await userServices.findByEmail(payload.email);
    const response = await recipesService.register({
      name, ingredients, preparation, userId: _id });
    return res.status(CREATED).send({ recipe: response });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  register,
};