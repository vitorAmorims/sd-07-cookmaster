const bcrypt = require('bcrypt-nodejs');
const usersServices = require('../services/usersService');

const serverError = 500;

const createUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let passwordEncrypted = req.body.password;
    const salt = bcrypt.genSaltSync(5);
    passwordEncrypted = bcrypt.hashSync(password, salt);
    const usersController = await usersServices.createUsers(name, email, passwordEncrypted);
    const { http, message } = usersController;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  createUsers,
};