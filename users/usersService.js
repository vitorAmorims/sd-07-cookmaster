const usersModel = require('./usersModel');

const registerUserService = async (user, role = 'user') => {
  const emailService = await usersModel.findEmailModel(user.email);
  if (emailService) return null;
  const addService = await usersModel.registerUserModel(user, role);
  return { user: addService };
};

const findUserService = async () => {
  const findService = await usersModel.findUserModel();
  return findService;
};

module.exports = {
  registerUserService,
  findUserService,
};