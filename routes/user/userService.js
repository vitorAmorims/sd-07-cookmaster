const userModel = require('./userModel');

const createUser = async (name, email, password) => {
  const exists = await userModel.getByEmail(email);
  if (exists) return null;
  const createdUser = await userModel.createUser(name, email, password);
  return createdUser;
};

module.exports = {
  createUser,
};
