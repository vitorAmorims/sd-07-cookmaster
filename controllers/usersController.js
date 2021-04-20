const usersServices = require('../services/usersService');

const serverError = 500;

const createUsers = async (req, res) => {
  try {
    const usersController = await usersServices.createUsers(req.body);
    const { http, message } = usersController;
    console.log(usersController);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  createUsers,
};