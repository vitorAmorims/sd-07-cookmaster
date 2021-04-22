const usersModel = require('../models/usersModel');

const createUser = async () => {
  const result = await usersModel.create();
};

module.exports = { createUser };
