const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const { createUser } = usersModel;
  const newUser = await createUser(name, email, password);
  return newUser;
}

module.exports = {
  createUser,
}