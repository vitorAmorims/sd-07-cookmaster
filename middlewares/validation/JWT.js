const rescue = require('express-rescue');
const { errorMessages: error } = require('../../utils');
const model = require('../../model');
const { jwt } = require('../../service');

module.exports = rescue(async (request, _response, next) => {
  const token = request.headers.authorization;

  if (!token) throw new Error(error.MISSING_AUTH);

  const { data } = jwt.decode(token);

  const user = await model.users.findById(data.id);
  
  if (!user) throw new Error(error.INVALID_TOKEN);

  request.user = user;

  next();
});
