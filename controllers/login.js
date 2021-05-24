const rescue = require('express-rescue');
const { httpStatus } = require('../utils');
const model = require('../model');
const { errorMessages: error } = require('../utils');

module.exports = rescue(async (request, response) => {
  const { email, password } = request.body;
  const user = await model.users.findByEmail(email);
  if (!user || user.password !== password) throw new Error(error.USERNAME_OR_PASSWORD);
  response.status(httpStatus.SUCCESS).send();
});
