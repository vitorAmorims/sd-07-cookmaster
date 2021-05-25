const rescue = require('express-rescue');
const { httpStatus } = require('../utils');
const model = require('../model');
const { errorMessages: error } = require('../utils');

const create = rescue(async (request, response) => {
  const { _id: userId } = request.user;
  const { name, ingredients, preparation } = request.body;
  const result = await model.recipes.create({ userId, name, ingredients, preparation });
  response.status(httpStatus.CREATED).send(result);
});

const getById = rescue(async (request, response) => {
  const { id } = request.params;
  const result = await model.recipes.getById(id);
  if (!result) throw new Error(error.NOT_FOUND);
  response.status(httpStatus.SUCCESS).send(result);
});

const getAll = rescue(async (_request, response) => {
  const result = await model.recipes.getAll();
  response.status(httpStatus.SUCCESS).send(result);
});

module.exports = { create, getAll, getById };
