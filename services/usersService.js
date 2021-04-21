const usersModel = require('../models/usersModels');
const { CONFLICT, SUCCESS, UNPROCESSABLE } = require('../controllers/statusCode');

const customAnswer = (message, http = UNPROCESSABLE) => ({
    http,
    message,
  });

  const emailMessage = {
    message: 'Email already registered',
  };

const createUsers = async (data) => {
  const validEmail = await usersModel.existsEmail(data.email);
  if (validEmail) {
    return customAnswer(emailMessage, CONFLICT);
  }
  const userService = await usersModel.createUsers(data);
  return customAnswer(userService, SUCCESS);
};

module.exports = {
  createUsers,
};