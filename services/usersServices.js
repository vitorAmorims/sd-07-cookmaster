const usersModels = require('../models/usersModels');
const validateUser = require('./usersValidations');
const httpResponses = require('../httpResponses.json');

const createUser = async (user) => {
  await validateUser(user);
  const result = await usersModels.createUser(user);

  return {
    status: httpResponses.codes.CREATED,
    result,
  };
};

module.exports = {
  createUser,
};
