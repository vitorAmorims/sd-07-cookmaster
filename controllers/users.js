const rescue = require('express-rescue');
const { httpStatus } = require('../utils');
const model = require('../model');

const create = rescue(async (request, response) => {
  const { name, email, password } = request.body;
  const result = await model.users.create({ name, email, password });
  response.status(httpStatus.CREATED).send(result);
});

module.exports = { create };
