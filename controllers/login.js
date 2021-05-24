const rescue = require('express-rescue');
const { httpStatus } = require('../utils');
const model = require('../model');
const { jwt } = require('../service');
const { errorMessages: error } = require('../utils');

module.exports = rescue(async (request, response) => {
  const { body } = request;
  const user = await model.users.findByEmail(body.email);
  if (!user || user.password !== body.password) throw new Error(error.USERNAME_OR_PASSWORD);
  const { _id: id, email, role } = user;
  const token = jwt.generateToken({ id, email, role });
  response.status(httpStatus.SUCCESS).send({ token });
});
