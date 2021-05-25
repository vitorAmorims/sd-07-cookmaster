const rescue = require('express-rescue');
const { httpStatus } = require('../utils');
const model = require('../model');
const { errorMessages: error } = require('../utils');

const create = rescue(async (request, response) => {
  const { name, email, password } = request.body;
  const result = await model.users.create({ name, email, password });
  response.status(httpStatus.CREATED).send(result);
});

const adminCreate = rescue(async (request, response) => {
  const { role } = request.user;
  if (role !== 'admin') throw new Error(error.NOT_ADMIN);
  const { name, email, password } = request.body;
  const result = await model.users.create({ name, email, password, role: 'admin' });
  response.status(httpStatus.CREATED).send(result);
});

module.exports = { create, adminCreate };
