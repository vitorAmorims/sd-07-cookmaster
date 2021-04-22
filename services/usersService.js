const usersModel = require('../models/usersModels');
const { CONFLICT, SUCCESS, UNPROCESSABLE } = require('../controllers/statusCode');

const customAnswer = (message, http = UNPROCESSABLE) => ({
    http,
    message,
  });

  const emailMessage = {
    message: 'Email already registered',
  };

const createUsers = async (name, email, password) => {
  const validEmail = await usersModel.existsEmail(email);

  if (validEmail) {
    return customAnswer(emailMessage, CONFLICT);
  }
  
  const userService = await usersModel.createUsers(name, email, password);
  return customAnswer(userService, SUCCESS);
};

module.exports = {
  createUsers,
};