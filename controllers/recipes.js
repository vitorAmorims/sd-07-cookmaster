const rescue = require('express-rescue');
const { httpStatus } = require('../utils');
const model = require('../model');

const create = rescue(async (request, response) => {
  const { _id: userId } = request.user;
  const { name, ingredients, preparation } = request.body;
  const result = await model.recipes.create({ userId, name, ingredients, preparation });
  response.status(httpStatus.CREATED).send(result);
});

module.exports = { create };
