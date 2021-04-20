const usersModel = require('../models/usersModels');

const unprocessable = 422;
// const success = 201;
const OK = 200;

const customAnswer = (message, http = unprocessable) => ({
    http,
    message,
  });

const createUsers = async (data) => {
  const userService = await usersModel.createUsers(data);
  return customAnswer(userService, OK);
};

module.exports = {
  createUsers,
};