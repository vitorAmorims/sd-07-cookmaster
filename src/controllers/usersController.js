const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const result = await usersService.createUser();
};

module.exports = { createUser };
